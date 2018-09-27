import React, { PureComponent, Fragment } from 'react';

const JRewind = (initialValue = null) => {
  const __MS__ = 50;
  let currentTime = 0;
  let disk = {};
  let value = initialValue;
  let interval = null;
  return {
    /**
     * @description Sets the value that will be recorded on each interval after JRewind
     * starts to record (so after the "startRecording" function is invoked).
     * @param {any} stuff - any value the user wants to save on the disk.
     */
    feeder: (stuff) => {
      value = stuff;
    },
    /**
     * @description Sets an interval that runs each 50ms (20fps). On each interval, the value
     * provided by the user using the function "feeder" will be recorded.
     */
    startRecording: () => {
      // prevents "startRecording" to start multiple intervals
      if(interval) return;

      interval = setInterval(() => {
        disk[currentTime] = {
          currentTime,
          value,
          done: false
        }
        currentTime += 50;
      }, __MS__)
    },
    /**
     * @description Clears the interval initialized by "startRecording" and sets a final record 
     * with the "done" property setted to true.
     */
    stopRecording: () => {
      clearInterval(interval);
      disk[currentTime] = {
        currentTime,
        value,
        done: true
      }
    },
    /**
     * 
     */
    getDuration: () => currentTime,
    getDisk: () => disk,
    Rewinder: class extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {}
        this.interval = null;
      }

      run = () => {
        if(this.interval) return;

        let keyOfRecord = 0;
        this.interval = setInterval(() => {
          let record = disk[keyOfRecord];
          if(record.done) {
            clearInterval(this.interval)
            this.interval = null;
          };

          this.setState(record);
          keyOfRecord += 50;
        }, __MS__)
      }

      stop = () => {
        clearInterval(this.interval);
        clearInterval(interval);
        disk[currentTime] = {
          currentTime,
          value,
          done: true
        }
        this.interval = null;
        this.forceUpdate()
      }

      rewindToMs = (ms) => {
        this.setState(disk[ms])
      }

      render() {
        return (
          <Fragment>
            { 
              this.props.render(this.state, {
                run: this.run, 
                stop: this.stop, 
                rewindToMs: this.rewindToMs 
              })
            }
          </Fragment>
        )
      }
    }
  }
}

export default JRewind;