(this["webpackJsonpbridge-deploy"]=this["webpackJsonpbridge-deploy"]||[]).push([[0],{261:function(e,t,n){},262:function(e,t,n){},268:function(e,t,n){},269:function(e){e.exports=JSON.parse("{}")},684:function(e,t,n){},686:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(15),c=n.n(r),s=(n(261),n(6)),i=(n.p,n(262),n(116)),l=n.n(i),u=n(1);var d=function(e){var t=Object(a.useState)({request:"",name:"",firstTimeStamp:"",secondTimeStamp:""}),n=Object(s.a)(t,2),o=n[0],r=n[1],c=[{command:"add marker (called) :name",callback:function(e){return r({request:"addMarkerCurrent",name:e.toLowerCase()})}},{command:"add marker (called) :name at :min minute(s) (and) :sec second(s)",callback:function(e,t,n){return r({request:"addMarker",name:e.toLowerCase(),firstTimeStamp:60*parseInt(t)+parseInt(n)})}},{command:"add loop (called) :name from :firstMin minute(s) (and) :firstSec second(s) until :secondMin minute(s) and :secondSec second(s)",callback:function(e,t,n,a,o){return r({request:"addLoop",name:e.toLowerCase(),firstTimeStamp:60*parseInt(t)+parseInt(n),secondTimeStamp:60*parseInt(a)+parseInt(o)})}},{command:"create marker (called) :name at :min minute(s) (and) :sec second(s)",callback:function(e,t,n){return r({request:"addMarker",name:e.toLowerCase(),firstTimeStamp:60*parseInt(t)+parseInt(n)})}},{command:"create loop (called) :name from :firstMin minute(s) (and) :firstSec second(s) until :secondMin minute(s) (and) :secondSec second(s)",callback:function(e,t,n,a,o){return r({request:"addLoop",name:e.toLowerCase(),firstTimeStamp:60*parseInt(t)+parseInt(n),secondTimeStamp:60*parseInt(a)+parseInt(o)})}},{command:"delete marker (called) :name",callback:function(e){return r({request:"delMarker",name:e.toLowerCase()})}},{command:"delete loop (called) :name",callback:function(e){return r({request:"delLoop",name:e.toLowerCase()})}},{command:"remove marker (called) :name",callback:function(e){return r({request:"delMarker",name:e.toLowerCase()})}},{command:"remove loop (called) :name",callback:function(e){return r({request:"delLoop",name:e.toLowerCase()})}},{command:"skip forward(s)",callback:function(){return r({request:"skipFwd"})}},{command:"skip backward(s)",callback:function(){return r({request:"skipBwd"})}},{command:"restart",callback:function(){return r({request:"restart"})}},{command:"go to marker (called) :name",callback:function(e){return r({request:"goToMarker",name:e.toLowerCase()})}},{command:"go to loop (called) :name",callback:function(e){return r({request:"goToLoop",name:e.toLowerCase()})}},{command:"exit loop",callback:function(){return r({request:"exitLoop"})}},{command:"pause",callback:function(){return r({request:"pause"})}},{command:"play",callback:function(){return r({request:"play"})}}],d=Object(i.useSpeechRecognition)({commands:c}),m=d.transcript,j=d.listening,p=d.resetTranscript,b=d.browserSupportsSpeechRecognition;return Object(a.useEffect)((function(){return console.log(o),e.sendToPlayer(o),p(),function(){p()}}),[o]),b?Object(u.jsxs)("div",{children:[Object(u.jsxs)("p",{children:["Microphone: ",j?"on":"off"]}),Object(u.jsx)("button",{onClick:l.a.startListening,children:"Start Mic Rec."}),Object(u.jsx)("button",{onClick:l.a.stopListening,children:"Stop Mic"}),Object(u.jsx)("button",{onClick:p,children:"Reset Mic Text"}),Object(u.jsx)("p",{children:m})]}):Object(u.jsx)("span",{children:"Browser doesn't support speech recognition."})},m=n(60),j=n(61),p=n(113),b=n(112),h=n(246),f=n(164),O=n(80),x=(n(268),n(269),n(245)),k=n.n(x);var g=function(e){Object(p.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={url:null,pip:!1,playing:!0,controls:!1,light:!1,volume:.2,muted:!1,played:0,loaded:0,duration:0,playbackRate:1,loop:!1,dictaphoneData:[],inLoop:!1,loopStartTime:"",loopEndTime:"",errorMessage:""},e.handlePlayPause=function(){e.setState({playing:!e.state.playing})},e.handleAddMarkerAtCurrentTime=function(t){var n=Object.assign({firstTimeStamp:parseInt(e.state.duration*e.state.played),duration:e.state.duration},t);n.request="addMarker",console.log(n),e.vocalPassInfoToApp(n)},e.handleDictaphoneData=function(t){e.setState((function(){return{dictaphoneData:t}})),"skipFwd"===t.request?e.vocalSkipForward(15):"skipBwd"===t.request?e.vocalSkipBackwards(15):"restart"===t.request?e.vocalRestart():"exitLoop"===t.request?e.vocalExitLoop():"pause"===t.request||"play"===t.request?e.handlePlayPause():"addMarkerCurrent"===t.request?e.handleAddMarkerAtCurrentTime(t):"addMarker"===t.request||"addLoop"===t.request?e.vocalAddElement(t):("delMarker"===t.request||"delLoop"===t.request||"goToMarker"===t.request||"goToLoop"===t.request)&&e.vocalPassInfoToApp(t)},e.load=function(t){e.setState({url:t,played:0,loaded:0,pip:!1})},e.handleStop=function(){e.setState({url:null,playing:!1})},e.handleToggleControls=function(){var t=e.state.url;e.setState({controls:!e.state.controls,url:null},(function(){return e.load(t)}))},e.handleToggleLight=function(){e.setState({light:!e.state.light})},e.handleToggleLoop=function(){e.setState({loop:!e.state.loop})},e.handleVolumeChange=function(t){e.setState({volume:parseFloat(t.target.value)})},e.handleToggleMuted=function(){e.setState({muted:!e.state.muted})},e.handleSetPlaybackRate=function(t){e.setState({playbackRate:parseFloat(t.target.value)})},e.handleOnPlaybackRateChange=function(t){e.setState({playbackRate:parseFloat(t)})},e.handleTogglePIP=function(){e.setState({pip:!e.state.pip})},e.handlePlay=function(){console.log("onPlay"),e.setState({playing:!0})},e.handleEnablePIP=function(){console.log("onEnablePIP"),e.setState({pip:!0})},e.handleDisablePIP=function(){console.log("onDisablePIP"),e.setState({pip:!1})},e.handlePause=function(){console.log("onPause"),e.setState({playing:!1})},e.handleSeekMouseDown=function(t){e.setState({seeking:!0})},e.handleSeekChange=function(t){e.setState({played:parseFloat(t.target.value)})},e.handleSeekMouseUp=function(t){e.setState({seeking:!1}),e.player.seekTo(parseFloat(t.target.value))},e.handleSkipForwardClick=function(t){e.player.seekTo(e.player.getCurrentTime()+parseInt(t.target.value),"seconds")},e.handleSkipBackwardClick=function(t){console.log(t),e.player.seekTo(e.player.getCurrentTime()-parseInt(t.target.value),"seconds")},e.handleProgress=function(t){e.state.seeking||e.setState(t),!0===e.state.inLoop&&e.state.played*e.state.duration>=e.state.loopEndTime-1&&e.player.seekTo(e.state.loopStartTime)},e.handleEnded=function(){console.log("onEnded"),e.setState({playing:e.state.loop})},e.handleDuration=function(t){console.log("onDuration",t),e.setState({duration:t})},e.renderLoadButton=function(t,n){return Object(u.jsx)("button",{onClick:function(){return e.load(t)},children:n})},e.ref=function(t){e.player=t},e}return Object(j.a)(n,[{key:"vocalSkipForward",value:function(e){this.player.seekTo(this.player.getCurrentTime()+e,"seconds")}},{key:"vocalSkipBackwards",value:function(e){this.player.seekTo(this.player.getCurrentTime()-e,"seconds")}},{key:"vocalPassInfoToApp",value:function(e){this.props.onCommandChange(e)}},{key:"vocalAddElement",value:function(e){var t=Object.assign({duration:this.state.duration},e);this.vocalPassInfoToApp(t)}},{key:"vocalRestart",value:function(){this.player.seekTo(0,"seconds")}},{key:"vocalExitLoop",value:function(){this.setState({inLoop:!1})}},{key:"convertToSeconds",value:function(e){var t=e.split(":"),n=Object(s.a)(t,2),a=n[0],o=n[1],r=60*parseInt(a);return r+=parseInt(o)}},{key:"convertToMinutes",value:function(e){var t=parseInt(e/60),n=Math.round(60*(e/60-t)).toString();return 1===n.length&&(n="0"+n),t+":"+n}},{key:"displayDurationWithTimeStamp",value:function(e,t){var n=e*t;return this.convertToMinutes(n)}},{key:"componentDidUpdate",value:function(e){var t=this;e.reply!==this.props.reply&&("goToMarker"===this.props.reply.request?this.player.seekTo(this.props.reply.time,"seconds"):"goToLoop"===this.props.reply.request&&(console.log(this.props.reply),this.setState({inLoop:!0,loopStartTime:this.props.reply.startTime,loopEndTime:this.props.reply.endTime},(function(){console.log(t.props.reply.startTime),t.player.seekTo(t.props.reply.startTime,"seconds")})))),e.url!==this.props.url&&(console.log(this.props.url),this.load(this.props.url)),e.currentTimeRequest!==this.props.currentTimeRequest&&this.props.currentTimeRequest}},{key:"render",value:function(){var e=this,t=this.state,n=t.url,a=t.playing,o=t.controls,r=t.light,c=t.volume,s=t.muted,i=t.loop,l=t.played,m=(t.loaded,t.duration,t.playbackRate),j=t.pip;t.dictaphoneData,t.inLoop,t.loopStartTime,t.loopEndTime;return Object(u.jsxs)("div",{className:"app",children:[Object(u.jsxs)("section",{className:"section",children:[Object(u.jsx)("h1",{children:"Bridge"}),Object(u.jsx)("div",{className:"player-wrapper",children:Object(u.jsx)(k.a,{ref:this.ref,className:"react-player",url:n,pip:j,playing:a,controls:o,light:r,loop:i,playbackRate:m,volume:c,muted:s,onReady:function(){return console.log("onReady")},onStart:function(){return console.log("onStart")},onPlay:this.handlePlay,onEnablePIP:this.handleEnablePIP,onDisablePIP:this.handleDisablePIP,onPause:this.handlePause,onBuffer:function(){return console.log("onBuffer")},onPlaybackRateChange:this.handleOnPlaybackRateChange,onSeek:function(e){return console.log("onSeek",e)},onEnded:this.handleEnded,onError:function(e){return console.log("onError",e)},onProgress:this.handleProgress,onDuration:this.handleDuration})}),Object(u.jsxs)(h.a,{children:[Object(u.jsx)(f.a,{children:Object(u.jsxs)(O.a,{lg:!0,md:8,children:[Object(u.jsx)("span",{children:this.displayDurationWithTimeStamp(this.state.played,this.state.duration)}),Object(u.jsx)("input",{type:"range",min:0,max:.999999,step:"any",style:{width:"700px"},value:l,onMouseDown:this.handleSeekMouseDown,onChange:this.handleSeekChange,onMouseUp:this.handleSeekMouseUp}),Object(u.jsx)("span",{children:this.convertToMinutes(this.state.duration)})]})}),Object(u.jsx)(f.a,{children:Object(u.jsxs)(O.a,{children:[Object(u.jsx)("button",{className:"controlButton",onClick:this.vocalRestart,value:15,children:"Restart"}),Object(u.jsx)("button",{className:"controlButton",onClick:this.handleSkipBackwardClick,value:15,children:"Skip Backwards"}),Object(u.jsx)("button",{className:"controlButton",onClick:this.handlePlayPause,children:a?"Pause":"Play"}),Object(u.jsx)("button",{className:"controlButton",onClick:this.handleSkipForwardClick,value:15,children:"Skip Forwards"}),Object(u.jsxs)("select",{className:"controlButton",onChange:this.handleSetPlaybackRate,name:"playback speed",id:"playbackSpeed",children:[Object(u.jsx)("option",{value:.25,children:"0.25x"}),Object(u.jsx)("option",{value:.5,children:"0.50x"}),Object(u.jsx)("option",{value:.75,children:"0.75x"}),Object(u.jsx)("option",{selected:"selected",value:1,children:"1.00x"}),Object(u.jsx)("option",{value:1.25,children:"1.25x"}),Object(u.jsx)("option",{value:1.5,children:"1.50x"}),Object(u.jsx)("option",{value:1.75,children:"1.75x"})]}),Object(u.jsxs)("div",{style:{marginTop:15},children:[Object(u.jsx)("input",{id:"volume",name:"volume",type:"range",min:0,max:1,step:"any",value:c,onChange:this.handleVolumeChange}),Object(u.jsx)("label",{for:"volume",children:"Volume"})]})]})})]}),Object(u.jsx)("label",{style:{marginRight:10},for:"customUrl",children:" New Youtube Url "}),Object(u.jsx)("input",{id:"customUrl",ref:function(t){e.urlInput=t},type:"text",placeholder:"Enter URL"}),Object(u.jsx)("button",{onClick:function(){return e.setState({url:e.urlInput.value})},children:"Load"}),Object(u.jsx)(d,{sendToPlayer:this.handleDictaphoneData})]}),Object(u.jsx)("footer",{className:"footer"})]})}}]),n}(a.Component),y=g,v=n(62),S=n(702);n(105);var T=function(e){var t=Object(a.useState)(e.title),n=Object(s.a)(t,2),o=n[0],r=(n[1],Object(a.useState)(e.colour)),c=Object(s.a)(r,2),i=c[0],l=(c[1],Object(a.useState)(e.startTime)),d=Object(s.a)(l,2),m=d[0],j=(d[1],Object(a.useState)(e.endTime)),p=Object(s.a)(j,2),b=p[0],f=(p[1],Object(a.useState)(!1)),x=Object(s.a)(f,2),k=x[0],g=x[1];return Object(u.jsx)(h.a,{children:Object(u.jsxs)(S.a,{checked:k,type:"checkbox",variant:"outline-primary",onClick:function(){k?(console.log("EXIT LOOP HERE USING CONTEXTAPI OR SOME SHIT"),g(!1)):(g(!0),e.onLoopClicked(o))},children:[Object(u.jsx)("span",{children:i}),Object(u.jsxs)(O.a,{children:[Object(u.jsx)("span",{children:o}),Object(u.jsxs)("span",{children:[" ",m," ",b]})]})]})})},C=n(704),I=n(256),w=n(705);var L=function(e){var t=e.submitLoop,n=e.onCancelLoop,o=e.errorMessage,r=Object(a.useState)(),c=Object(s.a)(r,2),i=c[0],l=c[1],d=Object(a.useState)(),m=Object(s.a)(d,2),j=m[0],p=(m[1],Object(a.useState)()),b=Object(s.a)(p,2),h=b[0],x=b[1],k=Object(a.useState)(),g=Object(s.a)(k,2),y=g[0],v=g[1],S=Object(a.useState)(""),T=Object(s.a)(S,2),L=T[0],M=T[1];return Object(a.useEffect)((function(){o&&M(!0)}),[o]),Object(u.jsxs)(C.a,{onSubmit:function(e){!function(e){o&&M(!0),t(i,j,h,y),e.preventDefault()}(e)},children:[Object(u.jsxs)(C.a.Group,{className:"mb-3",children:[Object(u.jsx)(C.a.Label,{children:"Title"}),Object(u.jsx)(C.a.Control,{placeholder:"Rift, Solo...",name:"title",type:"text",value:i,onChange:function(e){return l(e.target.value)}})]}),Object(u.jsxs)(f.a,{className:"mb-3",children:[Object(u.jsxs)(C.a.Group,{as:O.a,children:[Object(u.jsx)(C.a.Label,{children:"Start Time"}),Object(u.jsx)(C.a.Control,{name:"startTime",type:"text",value:h,onChange:function(e){return x(e.target.value)}})]}),Object(u.jsxs)(C.a.Group,{as:O.a,className:"mb-3",children:[Object(u.jsx)(C.a.Label,{children:"End Time"}),Object(u.jsx)(C.a.Control,{name:"endTime",type:"text",value:y,onChange:function(e){return v(e.target.value)}})]}),Object(u.jsx)(I.a,{type:"submit",children:"Submit Loop"}),Object(u.jsx)(I.a,{onClick:function(){n()},children:"Cancel"}),Object(u.jsxs)(w.a,{onClose:function(){return M(!1)},show:L,delay:3e3,autohide:!0,children:[Object(u.jsxs)(w.a.Header,{children:[Object(u.jsx)("img",{src:"holder.js/20x20?text=%20",className:"rounded me-2",alt:""}),Object(u.jsx)("strong",{className:"me-auto",children:"Error Message"})]}),Object(u.jsx)(w.a.Body,{children:o})]})]})]})},M=n(111),P=(n(383),function(e,t,n){return e>t&&e<n}),q=function(e){var t=parseInt(e/60),n=Math.round(60*(e/60-t)).toString();return 1===n.length&&(n="0"+n),t+":"+n},E=function(e){var t=e.split(":"),n=Object(s.a)(t,2),a=n[0],o=n[1],r=60*parseInt(a);return r+=parseInt(o)},R=function(e,t){return""===e?"Please provide a non-empty loop name":["0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","&","*","(",")","_","+"].some((function(t){return e.includes(t)}))?"Invalid character included":t.some((function(t){return e===t.key}))?"Title is already in use":""};n(163);var D=function(e){var t=Object(a.useState)([]),n=Object(s.a)(t,2),o=n[0],r=n[1],c=Object(a.useState)(!1),i=Object(s.a)(c,2),l=i[0],d=i[1],m=Object(a.useState)(""),j=Object(s.a)(m,2),p=j[0],b=j[1],O=Object(a.useState)(""),x=Object(s.a)(O,2),k=x[0],g=x[1],y=function(e){console.log("TEEEEST",e),r((function(t){return t.filter((function(t){return t.key!==e}))}))},S=function(e,t,n,a){var c=R(e,o);g(c),c||(d(!1),r((function(o){return[].concat(Object(v.a)(o),[Object(u.jsx)("li",{"list-style":"none",children:Object(u.jsxs)(f.a,{children:[Object(u.jsx)(T,{title:e,colour:t,startTime:n,endTime:a,onLoopClicked:function(e){return C(e)}}),Object(u.jsx)(M.a,{onClick:function(){return y(e)}})]})},e)])})))},C=function(e){b(e)},w=function(t,n){var a=o.find((function(e){return e.key===t})).props.children.props.children[0].props,r=E(a.startTime),c=E(a.endTime),s=Object.assign({request:n},a);s.startTime=r,s.endTime=c,e.onFoundTimeElement(s)};Object(a.useEffect)((function(){p&&w(p,"goToLoop")}),[p]);var D=function(e){var t=o.find((function(t){return e.name===t.key}));return t||g("Loop with name ".concat(e.name," does not exist")),t};return Object(a.useEffect)((function(){var t;if(!e.commandInformation.request.includes("marker"))return"addLoop"===e.commandInformation.request?(t=e.commandInformation,(P(t.firstTimeStamp,0,t.duration)&&P(t.secondTimeStamp,0,t.duration)?!o.find((function(e){return t.name===e.key})):(g("Loop exceeds video limits"),0))&&S(e.commandInformation.name,"colour",q(e.commandInformation.firstTimeStamp),q(e.commandInformation.secondTimeStamp))):"delLoop"===e.commandInformation.request?D(e.commandInformation)&&y(e.commandInformation.name):"goToLoop"===e.commandInformation.request&&D(e.commandInformation)&&w(e.commandInformation.name,e.commandInformation.request),function(){}}),[e.commandInformation]),Object(u.jsx)("div",{style:{height:80,width:300,float:"left"},children:Object(u.jsxs)(h.a,{children:[!l&&Object(u.jsxs)("ul",{children:[o,Object(u.jsx)(I.a,{onClick:function(){d(!0)},children:"Add Loop"})]}),l&&Object(u.jsx)("div",{children:Object(u.jsx)(L,{errorMessage:k,submitLoop:S,onCancelLoop:function(){g(""),d(!1)}})})]})})};var B=function(e){var t=Object(a.useState)(e.title),n=Object(s.a)(t,2),o=n[0],r=(n[1],Object(a.useState)(e.colour)),c=Object(s.a)(r,2),i=c[0],l=(c[1],Object(a.useState)(e.time)),d=Object(s.a)(l,2),m=d[0];return d[1],Object(u.jsx)(h.a,{children:Object(u.jsxs)(I.a,{onClick:function(){return e.onMarkerClicked(o)},children:[Object(u.jsx)("span",{children:i}),Object(u.jsxs)(O.a,{children:[Object(u.jsx)("span",{children:o}),Object(u.jsxs)("span",{children:[" ",m]})]})]})})};var N=function(e){var t=e.submitMarker,n=e.onCancelMarker,o=e.errorMessage,r=Object(a.useState)(),c=Object(s.a)(r,2),i=c[0],l=c[1],d=Object(a.useState)(),m=Object(s.a)(d,2),j=m[0],p=(m[1],Object(a.useState)()),b=Object(s.a)(p,2),h=b[0],x=b[1],k=Object(a.useState)(!1),g=Object(s.a)(k,2),y=g[0],v=g[1];return Object(a.useEffect)((function(){o&&v(!0)}),[o]),Object(u.jsxs)(C.a,{onSubmit:function(e){!function(e){o&&v(!0),t(i,j,h),e.preventDefault()}(e)},children:[Object(u.jsxs)(C.a.Group,{className:"mb-3",children:[Object(u.jsx)(C.a.Label,{children:"Title"}),Object(u.jsx)(C.a.Control,{placeholder:"Guitar, Drop...",name:"title",type:"text",value:i,onChange:function(e){return l(e.target.value)}})]}),Object(u.jsxs)(f.a,{className:"mb-3",children:[Object(u.jsxs)(C.a.Group,{as:O.a,children:[Object(u.jsx)(C.a.Label,{children:"Time"}),Object(u.jsx)(C.a.Control,{name:"time",type:"text",value:h,onChange:function(e){return x(e.target.value)}})]}),Object(u.jsx)(I.a,{type:"submit",children:"Submit Marker"}),Object(u.jsx)(I.a,{onClick:function(){n()},children:"Cancel "})]}),Object(u.jsxs)(w.a,{onClose:function(){return v(!1)},show:y,delay:3e3,autohide:!0,children:[Object(u.jsxs)(w.a.Header,{children:[Object(u.jsx)("img",{src:"holder.js/20x20?text=%20",className:"rounded me-2",alt:""}),Object(u.jsx)("strong",{className:"me-auto",children:"Error Message"})]}),Object(u.jsx)(w.a.Body,{children:o})]})]})};n(684);var F=function(e){var t=Object(a.useState)([]),n=Object(s.a)(t,2),o=n[0],r=n[1],c=Object(a.useState)(!1),i=Object(s.a)(c,2),l=i[0],d=i[1],m=Object(a.useState)(""),j=Object(s.a)(m,2),p=j[0],b=j[1],O=Object(a.useState)(""),x=Object(s.a)(O,2),k=x[0],g=x[1],y=function(e){r((function(t){return t.filter((function(t){return t.key!==e}))}))},S=function(e,t,n){var a=R(e,o);g(a),a||(d(!1),r((function(a){return[].concat(Object(v.a)(a),[Object(u.jsx)("li",{"list-style":"none",children:Object(u.jsxs)(f.a,{children:[Object(u.jsx)(B,{title:e,colour:t,time:n,onMarkerClicked:function(e){return T(e)}}),Object(u.jsx)(M.a,{onClick:function(){return y(e)}})]})},e)])})))},T=function(e){b(e)},C=function(t,n){var a=o.find((function(e){return e.key===t})).props.children.props.children[0].props,r=E(a.time),c=Object.assign({request:n},a);c.time=r,e.onFoundTimeElement(c)};Object(a.useEffect)((function(){p&&C(p,"goToMarker")}),[p]);var w=function(e){var t=o.find((function(t){return e.name===t.key}));return t||g("Marker with name ".concat(e.name," does not exist")),t};return Object(a.useEffect)((function(){var t;e.commandInformation.request.includes("loop")||("addMarker"===e.commandInformation.request?(t=e.commandInformation,(P(t.firstTimeStamp,0,t.duration)?(console.log("afterBetween"),!o.find((function(e){return t.name===e.key}))||(console.log("duplicateFalse"),0)):(console.log("fuck"),console.log(t),g("Marker exceeds video limits"),0))&&S(e.commandInformation.name,"colour",q(e.commandInformation.firstTimeStamp))):"delMarker"===e.commandInformation.request?(console.log("delMarker"),w(e.commandInformation)&&y(e.commandInformation.name)):"goToMarker"===e.commandInformation.request&&(console.log("goToMarker"),w(e.commandInformation)&&C(e.commandInformation.name,e.commandInformation.request)))}),[e.commandInformation]),console.log("test"),Object(u.jsx)("div",{style:{height:70,width:300,float:"right"},children:Object(u.jsxs)(h.a,{children:[!l&&Object(u.jsxs)("ul",{children:[o,Object(u.jsx)(I.a,{className:"custom-btn",onClick:function(){d(!0)},children:"Add Marker"})]}),l&&Object(u.jsx)("div",{style:{marginTop:20},children:Object(u.jsx)(N,{errorMessage:k,submitMarker:S,onCancelMarker:function(){d(!1)}})})]})})},A=n(703),U=(n(685),n(3));var G=function(e){return Object(u.jsxs)(A.a,Object(U.a)(Object(U.a)({},e),{},{size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[Object(u.jsx)(A.a.Header,{closeButton:!0,children:Object(u.jsx)(A.a.Title,{id:"contained-modal-title-vcenter",children:"Command Information"})}),Object(u.jsx)(A.a.Body,{children:Object(u.jsxs)("div",{children:[Object(u.jsx)("h4",{children:"Commands that should be done using voice (voice commands must be issued exactly like the following to work)"}),Object(u.jsxs)("h6",{children:[" ",Object(u.jsx)("b",{children:"Note that the words with colons in front of them represent values that you will choose. In addition, all of the following commands (except for jumping to loops/markers) can be done without voice input"})]}),Object(u.jsxs)("p",{children:["Add marker at a specific time = ",Object(u.jsx)("em",{children:"'add marker called :name at :min minutes and :sec seconds'"}),Object(u.jsx)("br",{}),"Add a loop that from one time stamp to another =",Object(u.jsx)("em",{children:" 'Add loop called :name from :firstMin minutes and :firstSec seconds until :secondMin minutes and :secondSec seconds'"}),Object(u.jsx)("br",{}),"Delete a marker by its name = ",Object(u.jsx)("em",{children:"'Delete marker called :name'"}),Object(u.jsx)("br",{}),"Delete a loop by its name = ",Object(u.jsx)("em",{children:" 'Delete loop called :name'"}),Object(u.jsx)("br",{}),"Skip 15 seconds ahead = ",Object(u.jsx)("em",{children:"'skip forward'"})," ",Object(u.jsx)("br",{}),"Rewind 15 seconds = ",Object(u.jsx)("em",{children:"'skip backwards'"})," ",Object(u.jsx)("br",{}),"Restart the song = ",Object(u.jsx)("em",{children:"'restart' "}),Object(u.jsx)("br",{}),"Jump to marker timestamp = ",Object(u.jsx)("em",{children:"'go to marker :name'"})," ",Object(u.jsx)("br",{}),"Jump to loop and repeatedly perform desired loop : ",Object(u.jsx)("em",{children:"'go to loop :name'"})," ",Object(u.jsx)("br",{}),"Exit loop = ",Object(u.jsx)("em",{children:"'exit loop' "}),Object(u.jsx)("br",{}),"Pause = ",Object(u.jsx)("em",{children:"'pause'"}),"Play = ",Object(u.jsx)("em",{children:"'play'"})]}),Object(u.jsx)("h4",{children:"Commands that should be done without voice commands"}),Object(u.jsxs)("p",{children:["Change Volume ",Object(u.jsx)("br",{}),"Change Playback Rate ",Object(u.jsx)("br",{}),"Change Song URL ",Object(u.jsx)("br",{})]})]})}),Object(u.jsx)(A.a.Footer,{children:Object(u.jsx)(I.a,{onClick:e.onHide,children:"Close"})})]}))};var H=function(){var e=Object(a.useState)(!0),t=Object(s.a)(e,2),n=t[0],o=(t[1],Object(a.useState)(!0)),r=Object(s.a)(o,2),c=r[0],i=r[1],l=Object(a.useState)(),d=Object(s.a)(l,2),m=d[0],j=d[1],p=Object(a.useState)(),b=Object(s.a)(p,2),h=b[0],x=b[1],k=Object(a.useState)({request:"",name:"",firstTimeStamp:"",secondTimeStamp:""}),g=Object(s.a)(k,2),v=g[0],S=g[1],T=Object(a.useState)({request:"",name:"",firstTimeStamp:"",secondTimeStamp:""}),C=Object(s.a)(T,2),w=C[0],L=C[1],M=Object(a.useState)(!1),P=Object(s.a)(M,2),q=P[0],E=P[1];function R(e){L(e)}return Object(u.jsxs)("div",{children:[c&&Object(u.jsxs)(A.a,{show:c,fullscreen:n,onHide:function(){return i(!1)},children:[Object(u.jsx)(A.a.Header,{closeButton:!0,children:Object(u.jsx)(A.a.Title,{children:"Bridge"})}),Object(u.jsxs)(A.a.Body,{children:[Object(u.jsx)("p",{children:"Welcome to Bridge, a web application that bridges the gap between transcribing music and digital media. This product offers a hands-free method of manipulating music that provides our users with features such as looping, marking tracks, and playback control. Additionally, these same features can all be controlled through voice commands. For the best experience possible, it is recommended to use headphones to listen to the music."}),Object(u.jsx)("h1",{children:"Get Started"}),Object(u.jsx)("th",{children:"Copy Paste YouTube Link"}),Object(u.jsxs)("td",{children:[Object(u.jsx)("input",{ref:function(e){x(e)},type:"text",placeholder:"Enter URL"}),Object(u.jsx)("button",{onClick:function(){i(!1),j(h.value)},children:" Go"})]})]})]}),Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(I.a,{variant:"primary",onClick:function(){return E(!0)},children:"Info"}),Object(u.jsx)(G,{show:q,onHide:function(){return E(!1)}}),Object(u.jsxs)(f.a,{children:[Object(u.jsx)(O.a,{children:Object(u.jsx)(D,{commandInformation:v,onFoundTimeElement:R})}),Object(u.jsx)(O.a,{children:Object(u.jsx)(F,{commandInformation:v,onFoundTimeElement:R})})]}),Object(u.jsx)(y,{onCommandChange:function(e){S((function(t){return e}))},reply:w,url:m})]})]})},J=function(e){e&&e instanceof Function&&n.e(16).then(n.bind(null,706)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),o(e),r(e),c(e)}))};c.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(H,{})}),document.getElementById("root")),J()}},[[686,14,15]]]);
//# sourceMappingURL=main.4455a0e8.chunk.js.map