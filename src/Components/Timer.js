import React from "react";
import '../Timer.css';
import moment from 'moment';
import Clock from './Clock';
import LogItem from './LogItem'
// import Button from './Button'

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            startTime:'', 
            stopTime:'', 
            timerLog:[],
            started:false,
        }
    }

    handleStart = (event) => {
        this.setState({ startTime: moment.now(),
                        started: true}, () => {
            console.log(`Start time ${this.state.startTime}`);
            
        });
    }

    handleStop = (event) => {
        if (this.state.startTime > 0){
            this.setState({ stopTime: moment.now()}, () => {
                console.log(`Stop time ${this.state.stopTime}`);
                const duration = this.calculateDuration();
                
                this.state.timerLog.push(duration);
                this.setState({timerLog: this.state.timerLog})
                
                console.log(`Duration ... ${duration}`)
                console.log(this.state.timerLog)
            });
        }
    }

    calculateDuration() {
        const interval =  Math.floor(this.state.stopTime - this.state.startTime) / 1000;
        const mins = Math.floor(interval/60);
        const secs = Math.floor(interval % 60);
        return `Duration => minutes: ${mins} seconds: ${secs}`;
    }

    handleReset = (event) => {
        event.preventDefault();
        this.setState({ startTime:'', stopTime: '',
            started: false, timerLog:[],}, () => {
            console.log(`fields reset start: ${this.state.startTime}, stop: ${this.state.stopTime}`)
        })
    }

    handleStartChange = (event) => {
        this.setState({startTime: event.target.value});
    }

    handleStopChange = (event) => {
        this.setState({stopTime: event.target.value});
    }

    render() { 
        return (
            <div className='container'>
                
                {this.state.started && <Clock />}
                
                <div className='input-group'>
                    <span align='center'>Start Time</span>
                    <input readOnly value={this.state.startTime !=='' ? moment(this.state.startTime).format('hh:mm:ss A') : ''} onChange={this.handleStartChange} style={{textAlign:'center'}}></input>
                </div>
                <div className='input-group'>
                    <span align='center'>Stop Time</span>
                    <input readOnly value={this.state.stopTime !=='' ? moment(this.state.stopTime).format('hh:mm:ss A') : ''} onChange={this.handleStopChange} style={{textAlign:'center'}}></input>
                </div>
                <div id="buttonDiv">
                    <button className='btn' onClick={(e) => this.handleStart(e)} >Start</button>
                    <button className='btn' onClick={(e) => this.handleStop(e)} >Stop</button>
                    <button className='btn' onClick={(e) => this.handleReset(e)} >Reset</button>
                </div>
                <div>
                    <LogItem duration={this.state.timerLog} />
                </div>
            </div>
        );
    }
}
 
export default Timer;