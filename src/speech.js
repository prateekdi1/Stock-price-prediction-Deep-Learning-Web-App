import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import PropTypes from 'prop-types'

let showflag = 0;
let numdays = 1 ;
let stkName = '';
let transcriptcount = 0;

const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    interimTranscript: PropTypes.string,
    finalTranscript: PropTypes.string,
    resetTranscript: PropTypes.func,
    startListening: PropTypes.func,
    stopListening: PropTypes.func,
    recognition: PropTypes.object,
    browserSupportsSpeechRecognition: PropTypes.bool,
    listening :PropTypes.bool
  };

class Dictaphone extends Component {
    constructor(props){
      super(props);
      this.state ={
        flag : 0,
        showflag: 0,
        stkName: '',
        numdays: 1
      }
    }

    // callHandler=(e)=>{
    //   this.props.SpeechUpdate(stkName, showflag,numdays);
    // }


  render() {

   

    const { transcript,
            interimtranscript,
            finaltranscript,
            resetTranscript,
            startListening,
            stopListening,
            recognition= {lang:'en-UK'},
            browserSupportsSpeechRecognition,
            listening } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    console.log(transcript)
    let transcript1 = transcript;
     showflag = 0;
    numdays = 1 ;
     stkName = '';
    let transcriptcount = 0;
    let finalText ='';
    let transcriptArr = transcript1.split(' ')
    if(transcriptArr.length>1)
    {
      transcriptcount = 1;
      console.log(transcriptcount, transcriptArr.length)
    }

    let j1 = 0;
        let k1 = 0;
        let predictioncounter = 0;
        let j_value = 0;

        if(!listening && transcriptcount==1) {
          console.log('listening stopped');
          console.log(transcriptArr);

        for (j1 = 0; j1< transcriptArr.length; j1++){
          if ((transcriptArr[j1]==='predictions' || transcriptArr[j1]==='prediction' ||
              transcriptArr[j1]==='predict' || transcriptArr[j1]==='predict') &&
              (transcriptArr[j1+1]==='of' || transcriptArr[j1+1]==='for')){
                predictioncounter = 1;
                showflag=1;
                j_value = j1;
              }}
              
                for(  k1 =0; k1<transcriptArr.length;k1++)
                {
                  if ((transcriptArr[k1]==='dont' || //transcriptArr[k1]==='do not' ||
                        transcriptArr[k1]==='not')&& predictioncounter==1){
                          showflag=2;
                          this.props.SpeechUpdate(stkName, showflag, numdays)
                            console.log(stkName);
                            //console.log(temparr);
                            console.log(showflag);
                      }}

                      if(showflag===1){
                        console.log(j_value);
                            let temparr = transcriptArr.slice(-(transcriptArr.length -j_value-2))
                              if(temparr[temparr.length - 1]==='please') {
                               let temparr1 = temparr.slice(0,-1) 
                               stkName = temparr1.join(" "); 
                               this.props.SpeechUpdate(stkName, showflag, numdays);
                              }
                              else {
                               stkName = temparr.join(" ");
                               this.props.SpeechUpdate(stkName, showflag, numdays);
                              }
                                console.log(stkName);
                                console.log(temparr);
                                console.log(showflag);
                                j_value=0;
                      }
                      else {
                        showflag=3;
                        console.log(stkName);
                        console.log(showflag);
                        this.props.SpeechUpdate(stkName, showflag, numdays);
                      }
        
    }

    // if(showflag===1 && !listening)
    // { console.log('calling parent function');
    //   this.props.SpeechUpdate(stkName, showflag, numdays);
    // }

    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <span>{transcript} 
      
        </span>
        
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

export default SpeechRecognition({autoStart: true, continuous: false})(Dictaphone)