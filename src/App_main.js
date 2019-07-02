import React from 'react';

import './App.css';
//import TF_DL_Model from './App';

import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";



function Appmain() {

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
  
  const Dictaphone = ({
    transcript,
    interimtranscript,
    finaltranscript,
    resetTranscript,
    startListening,
    stopListening,
    recognition= {lang:'en-UK'},
    browserSupportsSpeechRecognition,
    listening
  }) => {
    if (!browserSupportsSpeechRecognition) {
      return null;
    }
        console.log(transcript)
        let transcript1 = transcript;
        
        let finalText ='';
        let transcriptArr = transcript1.split(' ')
        if(transcriptArr.length>0)
        {
          transcriptcount = 1;
          console.log(transcriptcount)
        }
        
        let j1 = 0;
        let k1 = 0;
        let predictioncounter = 0;
        let j_value = 0;

        if(!listening && transcriptcount==1) {
          console.log('listening stopped');
          console.log(transcriptArr);

        for (j1 = 0; j1< transcriptArr.length; j1++){
          if ((transcriptArr[j1]==='prediction' || transcriptArr[j1]==='prediction' ||
              transcriptArr[j1]==='predict' || transcriptArr[j1]==='predict') &&
              (transcriptArr[j1+1]==='of' || transcriptArr[j1+1]==='for')){
                predictioncounter = 1;
                showflag = 1;
                j_value = j1;
              }}
              
                for(  k1 =0; k1<transcriptArr.length;k1++)
                {
                  if ((transcriptArr[k1]==='dont' || //transcriptArr[k1]==='do not' ||
                        transcriptArr[k1]==='not')&& predictioncounter==1){
                            showflag =2;
                            //console.log(stkName);
                            //console.log(temparr);
                            console.log(showflag);
                      }}

                      if(showflag==1){
                        console.log(j_value);
                            let temparr = transcriptArr.slice(-(transcriptArr.length -j_value-2))
                              if(temparr[temparr.length - 1]==='please') {
                               let temparr1 = temparr.slice(0,-1) 
                                stkName = temparr1.join(" ");
                              }
                              else {
                                stkName = temparr.join(" ");
                              }
                                console.log(stkName);
                                console.log(temparr);
                                console.log(showflag);
                                j_value=0;
                      }
                      else {
                        showflag =3;
                        console.log(stkName);
                        //console.log(temparr);
                        console.log(showflag);
                      }
     
    }
  
        // const stopCmd = transcriptArr.slice(-3, -1)
        // console.log('stopCmd', stopCmd)
        

    //     for (j1 = 0; j1< transcriptArr.length; j1++){
    //       if ((transcriptArr[j1]==='prediction' || transcriptArr[j1]==='prediction' ||
    //           transcriptArr[j1]==='predict' || transcriptArr[j1]==='predict') &&
    //           (transcriptArr[j1+1]==='of' || transcriptArr[j1+1]==='for')){
    //             for(  k1 =0; k1<transcriptArr.length;k1++)
    //             {
    //                 if (transcriptArr[k1]==='dont' || transcriptArr[k1]==='do not' ||
    //                     transcriptArr[k1]==='not'){
    //                         // for( l =0; l<transcriptArr.length;l++){
    //                         //     if (transcriptArr[l]==='show') {
    //                         //           showflag =2;
    //                         //     }}
    //                         showflag =2;
    //                   }
    //                 else {
    //                         showflag =1;
    //                         const temparr = transcriptArr.slice(-(j1+2), -1)
    //                           if(temparr[temparr.length - 1]==='please') {
    //                            let temparr1 = temparr.slice(0,-1)
    //                             stkName = temparr1.join(" ");
    //                             console.log(stkName);
    //                             console.log(temparr);

    //                           }
    //                      }
    //     }
    //   }
    //   else{
    //     showflag =3;
    //   }
    // }
  
    //   if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
    //       //stopListening()
    //       console.log('Stopped listening per command')
    //       finalText = transcriptArr.slice(0, -3).join(' ') 
    // }



console.log(finalText);
    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <span>{transcript}</span>
      </div>
    );
  };
  
  Dictaphone.propTypes = propTypes;

  const options = {
    autoStart: true,
    continuous: false
  }
  
  let Speechrec = SpeechRecognition(options)(Dictaphone)

  return (
    <div className="App">
      <Speechrec/>
    </div>
  );
}

export default Appmain;
