var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var PreviewPlayerConstants={STATE_DISCONNECTED:0,STATE_CONNECTED:1,STATE_READY:2,USER_OPT_IN:"in",USER_OPT_OUT:"out",USE_H5_PREVIEW_PREFERENCE_KEY:"useH5Preview"};var PreviewPlayerEvent={ANIMATION_INCOMPATIBLE:"PreviewPlayerEvent.ANIMATION_INCOMPATIBLE",USER_OPT_OUT:"PreviewPlayerEvent.USER_OPT_OUT"};var FPS=24,AUDIO_CHUNK_SIZE=240*1024,MAX_CONCURRENT_XHR_CONNECTION=6,VIDEO_START_TIME_THRESHOLD=0.09,SAFARI_MIN_REQ_VERSION=10;var isBrowserSafari=((navigator.userAgent.indexOf("Safari")>-1)&&(navigator.userAgent.indexOf("Chrome")===-1)),isBrowserOlderSafari=isBrowserSafari&&(getSafariBrowserVersion()<SAFARI_MIN_REQ_VERSION);function getSafariBrowserVersion(){var a=navigator.userAgent.match(/version\/([0-9\.]+)/i);return a?parseFloat(a[1]):-1}function decodeMessageData(c){if(window.TextDecoder){return(new TextDecoder("utf-8").decode(c))}var a="";var e=new Uint8Array(c);var d=e.length;for(var b=0;b<d;b++){a+=String.fromCharCode(e[b])}return a}var PreviewPlayer=function(b,c){var a=this;this.host=b;this._connection=null;this._connectionId=null;this._directTransferConnection=null;this._pendingAudioToken=null;this._pendingPreviewMessage=null;this._userAuthenticationToken=null;this._movieId=null;this._shouldOptInAtBeginning=c;this._connectionState=PreviewPlayerConstants.STATE_DISCONNECTED;this._mediaController=new MediaController();this._startingPreview=false;this._previewTrackingData={startTimestamp:0,isAudioInAnimation:false,visualFragmentDuration:0,isVisualFragmentCached:false,isVisualFragmentArrived:false,audioFragmentDuration:0,isAudioFragmentCached:false,isAudioFragmentArrived:false,timeRender:0};this._mediaController.previewFragmentAddedHandler=function(){function d(){var f=a._videoElem.buffered.end(0),g=a._startFrame/FPS;if(isBrowserOlderSafari){g=Math.max(g,VIDEO_START_TIME_THRESHOLD)}if((f>g)&&(a._startingPreview===true)){a._videoElem.currentTime=g;a._videoElem.play();a._startingPreview=false}}try{d()}catch(e){a._videoElem.addEventListener("loadedmetadata",d)}};this._objectURL=null;this._visualScenes=null;this._audioScenes=null;this._startFrame=null};PreviewPlayer.prototype.setVideoElement=function(a){this._videoElem=a;this._updateVideoSource()};PreviewPlayer.prototype.setUserAuthenticationToken=function(a){this._userAuthenticationToken=a};PreviewPlayer.prototype.setFromPptConversion=function(a){this._fromPptConversion=a};PreviewPlayer.prototype.setMovieId=function(a){this._movieId=a};PreviewPlayer.prototype.connect=function(){this._connection=new WebSocket(this.host);this._connection.onerror=this._connectionErrorHandler.bind(this);this._connection.onclose=this._connectionCloseHandler.bind(this);this._connection.onopen=this._connectionOpenHandler.bind(this);this._connection.onmessage=this._connectionMessageHandler.bind(this)};PreviewPlayer.prototype.authenticate=function(){var a=JSON.stringify({eventName:"AUTH",data:this._userAuthenticationToken});if(this._connection){this._connection.send(a)}};PreviewPlayer.prototype.preview=function(d,a){function c(e){return btoa(String.fromCharCode.apply(null,e))}var b=JSON.stringify({eventName:"PREVIEW_LEGACY",encryptedMovieId:this._movieId,data:c(pako.gzip(d)),fromPptConversion:this._fromPptConversion});this._startingPreview=true;this._startFrame=a;this._visualFragQueue=[];this._audioFragQueue=[];this._nextFragQueue=this._audioFragQueue;this._activeXhr=0;this._receivedVisualData={};this._receivedAudioData={};if(this._connectionState===PreviewPlayerConstants.STATE_READY){this._connection.send(b)}else{this._pendingPreviewMessage=b;this.connect()}this._previewTrackingData={};this._previewTrackingData.startTimestamp=this._getCurrentTime()};PreviewPlayer.prototype.userOptIn=function(){var b=JSON.stringify({eventName:"AUTH",data:this._userAuthenticationToken,opt:PreviewPlayerConstants.USER_OPT_IN});try{this._connection.send(b);window.localStorage.setItem(PreviewPlayerConstants.USE_H5_PREVIEW_PREFERENCE_KEY,PreviewPlayerConstants.USER_OPT_IN)}catch(a){}};PreviewPlayer.prototype.userOptOut=function(){var b=JSON.stringify({eventName:"AUTH",data:this._userAuthenticationToken,opt:PreviewPlayerConstants.USER_OPT_OUT});try{this._connection.send(b);window.localStorage.setItem(PreviewPlayerConstants.USE_H5_PREVIEW_PREFERENCE_KEY,PreviewPlayerConstants.USER_OPT_OUT)}catch(a){}};PreviewPlayer.prototype._getCurrentTime=function(){return Date.now()/1000};PreviewPlayer.prototype._handlePendingPreviewRequest=function(){if(this._pendingPreviewMessage!==null){this._connection.send(this._pendingPreviewMessage);this._pendingPreviewMessage=null}};PreviewPlayer.prototype._updateVideoSource=function(){if(this._videoElem&&this._objectURL&&(this._videoElem.src!==this._objectURL)){this._videoElem.src=this._objectURL}};PreviewPlayer.prototype._disconnect=function(){this._connection=null;this._connectionState=PreviewPlayerConstants.STATE_DISCONNECTED};PreviewPlayer.prototype._connectionOpenHandler=function(){};PreviewPlayer.prototype._connectionErrorHandler=function(a){this._disconnect()};PreviewPlayer.prototype._connectionCloseHandler=function(a){this._disconnect()};PreviewPlayer.prototype._connectionMessageHandler=function(e){var d;try{if(e.data instanceof ArrayBuffer){var g=5,f=new Uint8Array(e.data,0,g);if(f[0]===66){var c=f[1]+(f[2]<<8)+(f[3]<<16)+(f[4]<<24);var a=e.data.slice(g,c+g);d=JSON.parse(decodeMessageData(a));var h=d.bufferSize;d.buffer=e.data.slice(g+c,g+c+h)}else{throw new Error("Unexpected RSS message")}}else{d=JSON.parse(e.data)}}catch(b){console.error(b);return}switch(d.eventName){case"CONNECT_ACK":this._handleConnectAck(d);break;case"AUTH_ACK":this._handleAuthAck(d);break;case"PREVIEW_ACK":this._handlePreviewAck(d);break;case"PREVIEW_NCK":this._handlePreviewNck(d);break;case"AUDIO_READY":this._handleAudioReady(d);break;case"VISUAL_READY":this._handleVisualReady(d);break;case"AUDIO_DATA_READY":this._handleAudioDataReady(d);break;case"VISUAL_DATA_READY":this._handleVisualDataReady(d);break;case"USER_OPT_OUT":this._handleUserOptOut(d);break}};PreviewPlayer.prototype._handleConnectAck=function(a){this._connectionId=a.connectionId;this._connectionState=PreviewPlayerConstants.STATE_CONNECTED;this.authenticate()};PreviewPlayer.prototype._handleAuthAck=function(b){this._connectionState=PreviewPlayerConstants.STATE_READY;var a=b.directTransferChannel;if(a){this._directTransferConnection=new WebSocket(this.host+"/"+a);this._directTransferConnection.binaryType="arraybuffer";this._directTransferConnection.onmessage=this._connectionMessageHandler.bind(this)}if(this._shouldOptInAtBeginning){this.userOptIn()}else{this.userOptOut()}this._handlePendingPreviewRequest()};PreviewPlayer.prototype._handlePreviewAck=function(h){var d=this,e=h.data;this._visualScenes=e.visual;this._audioScenes=e.audio;var b=this._getSubFragmentCount(this._visualScenes),a=this._getSubFragmentCount(this._audioScenes),c=this._getAudioOffsetList(this._audioScenes),g=(a>0)?true:false,f=true;if(!window.MediaSource){return}this._objectURL=this._mediaController.initPreview(b,a,c,e.duration,function(){for(var t in d._visualScenes){if(!d._visualScenes.hasOwnProperty(t)){continue}var k=d._visualScenes[t].frags,r=d._visualScenes[t].offset;for(var n in k){var p=k[n].url,m=k[n].len,u=parseInt(n)+r;if(p){d._fetchVideo(p,u/FPS,f,null)}if(u===0){d._previewTrackingData.visualFragmentDuration=m/FPS;if(p){d._previewTrackingData.isVisualFragmentCached=true}else{d._previewTrackingData.isVisualFragmentCached=false}}}}if(g){for(var o in d._audioScenes){if(!d._audioScenes.hasOwnProperty(o)){continue}var i=d._audioScenes[o].frags;for(var n in i){var s=i[n].url,l=i[n].length,q=i[n].size,u=parseInt(n),j=false;if(isNaN(u)){u=0;l=e.duration;j=true}if(s){d._fetchAudio(s,null,u,l/FPS,q,f,j)}if(u===0){if(s){d._previewTrackingData.isAudioFragmentCached=true}else{d._previewTrackingData.isAudioFragmentCached=false}d._previewTrackingData.audioFragmentDuration=l/FPS}}}d._previewTrackingData.isAudioInAnimation=true}else{d._previewTrackingData.isAudioInAnimation=false}d._checkAndFetchFragments()});d._previewTrackingData.isVisualFragmentArrived=false;d._previewTrackingData.isAudioFragmentArrived=false;this._updateVideoSource()};PreviewPlayer.prototype._handlePreviewNck=function(a){window.dispatchEvent(new Event(PreviewPlayerEvent.ANIMATION_INCOMPATIBLE))};PreviewPlayer.prototype._handleAudioReady=function(f){var h=this._audioScenes[f.token],d=f.startFrame,c=f.token,g=f.url,b=f.size,e=f.length/FPS,a=false;if(f.full){d=0;a=true}this._fetchAudio(g,c,d,e,b,false,a)};PreviewPlayer.prototype._handleVisualReady=function(d){var c=d.token,b=d.startFrame,a=c+"-"+b,g=this._visualScenes[c],f=(g.offset+b)/FPS;var e=d.url;this._fetchVideo(e,f,false,a)};PreviewPlayer.prototype._handleVisualDataReady=function(e){var d=e.token,c=e.startFrame,a=e.buffer,f=this._visualScenes[d].offset,b=d+"-"+c;if(this._receivedVisualData[b]){return}this._receivedVisualData[b]=true;var g=(f+c)/FPS;if(g===0){this._previewTrackingData.visualRenderFinishTimestamp=this._getCurrentTime()}this._mediaController.addVideoFragment(a,g);if(g===0){this._previewTrackingData.visualDownloadFinishTimestamp=this._getCurrentTime();this._previewTrackingData.isVisualFragmentArrived=true;this._previewTrackingData.isDirectTransferFirstVisualFragment=true;this._reportWaitingTime()}};PreviewPlayer.prototype._handleAudioDataReady=function(c){var i=c.full,h=c.startFrame,a=c.length,b=c.bufferSize,g=c.buffer,d=c.token,j=c.index,l=(i===true),f=(l?0:(h/FPS)),e=a/FPS,k;if(l){k=d+"-"+j;var m=Math.ceil(b/AUDIO_CHUNK_SIZE);this._mediaController.updateRecordForAudioRangeDownload(m)}else{k=d+"-"+h}if(this._receivedAudioData[k]){return}this._receivedAudioData[k]=true;if(f===0){this._previewTrackingData.audioDownloadFinishTimestamp=this._getCurrentTime();this._previewTrackingData.isAudioFragmentArrived=true;this._previewTrackingData.isDirectTransferFirstAudioFragment=true;this._reportWaitingTime()}this._mediaController.addAudioFragment(g,f,e,l)};PreviewPlayer.prototype._handleUserOptOut=function(a){window.localStorage.setItem(PreviewPlayerConstants.USE_H5_PREVIEW_PREFERENCE_KEY,PreviewPlayerConstants.USER_OPT_OUT);window.dispatchEvent(new Event(PreviewPlayerEvent.USER_OPT_OUT))};PreviewPlayer.prototype._fetchVideo=function(b,f,d,c){if(c&&this._receivedVisualData[c]){return}if(f===0){this._previewTrackingData.visualRenderFinishTimestamp=this._getCurrentTime()}var a=this,e=new XMLHttpRequest();d=d||false;e.open("get",b);e.responseType="arraybuffer";e.onload=function(){a._activeXhr--;a._checkAndFetchFragments();if(c&&a._receivedVisualData[c]){return}else{if(c){a._receivedVisualData[c]=true}}a._mediaController.addVideoFragment(e.response,f);if(f===0){a._previewTrackingData.visualDownloadFinishTimestamp=a._getCurrentTime();a._previewTrackingData.isVisualFragmentArrived=true;a._reportWaitingTime()}};this._visualFragQueue.push(e);if(!d){this._checkAndFetchFragments()}};PreviewPlayer.prototype._fetchAudio=function(b,g,j,d,m,c,e){c=c||false;if(e){var h,k,a,f,l=Math.ceil(m/AUDIO_CHUNK_SIZE);this._mediaController.updateRecordForAudioRangeDownload(l);for(h=0;h<l;h++){k=g+"-"+h;if(this._receivedAudioData[k]){continue}a=h*AUDIO_CHUNK_SIZE;f=((h+1)*AUDIO_CHUNK_SIZE)-1;f=Math.min(f,m);this._fetchAudioByRange(h,b,a,f,c,k)}}else{var k=g+"-"+j;if(this._receivedAudioData[k]){return}this._fetchAudioByFragment(b,j,d,c,e,k)}};PreviewPlayer.prototype._fetchAudioByFragment=function(a,f,c,b,d,g){var i=this,e=f/FPS,h=new XMLHttpRequest();if(e===0){this._previewTrackingData.audioRenderFinishTimestamp=this._getCurrentTime()}h.open("get",a);h.responseType="arraybuffer";h.onload=function(){i._activeXhr--;i._checkAndFetchFragments();if(g&&i._receivedAudioData[g]){return}else{if(g){i._receivedAudioData[g]=true}}i._mediaController.addAudioFragment(h.response,e,c,d);if(e===0){i._previewTrackingData.audioDownloadFinishTimestamp=i._getCurrentTime();i._previewTrackingData.isAudioFragmentArrived=true;i._reportWaitingTime()}};this._audioFragQueue.push(h);if(!b){this._checkAndFetchFragments()}};PreviewPlayer.prototype._fetchAudioByRange=function(a,c,h,f,e,d){var b=this,g=new XMLHttpRequest();if(h===0){this._previewTrackingData.audioRenderFinishTimestamp=this._getCurrentTime()}g.open("get",c);g.setRequestHeader("range","bytes="+h+"-"+f);g.responseType="arraybuffer";g.onload=function(){b._activeXhr--;b._checkAndFetchFragments();if(d&&b._receivedAudioData[d]){return}else{if(d){b._receivedAudioData[d]=true}}b._mediaController.addAudioByRange(g.response,a);if(h===0){b._previewTrackingData.audioDownloadFinishTimestamp=b._getCurrentTime();b._previewTrackingData.isAudioFragmentArrived=true;b._reportWaitingTime()}};this._audioFragQueue.push(g);if(!e){this._checkAndFetchFragments()}};PreviewPlayer.prototype._reportWaitingTime=function(){var c=false,a=this._previewTrackingData;if(a.isAudioInAnimation){c=a.isVisualFragmentArrived&&a.isAudioFragmentArrived}else{c=a.isVisualFragmentArrived}if(c){var b={eventName:"PREVIEW_FINISH",visualDuration:a.visualFragmentDuration,audioDuration:a.audioFragmentDuration,cached:{visual:a.isVisualFragmentCached},startTime:a.startTimestamp,visualRenderTime:a.visualRenderFinishTimestamp,visualReadyTime:a.visualDownloadFinishTimestamp,isDirectTransferAudio:a.isDirectTransferFirstAudioFragment,isDirectTransferVisual:a.isDirectTransferFirstVisualFragment};if(a.isAudioInAnimation){b.cached.audio=a.isAudioFragmentCached;b.audioRenderTime=a.audioRenderFinishTimestamp;b.audioReadyTime=a.audioDownloadFinishTimestamp}if(this._connectionState===PreviewPlayerConstants.STATE_READY){this._connection.send(JSON.stringify(b))}else{this._pendingPreviewMessage=JSON.stringify(b);this.connect()}}};PreviewPlayer.prototype._checkAndFetchFragments=function(){if(this._activeXhr<MAX_CONCURRENT_XHR_CONNECTION){if(this._nextFragQueue.length>0){var a=this._nextFragQueue.shift();this._activeXhr++;a.send()}this._nextFragQueue=(this._nextFragQueue===this._audioFragQueue)?this._visualFragQueue:this._audioFragQueue;if((this._audioFragQueue.length>0)||(this._visualFragQueue.length>0)){this._checkAndFetchFragments()}}};PreviewPlayer.prototype._getSubFragmentCount=function(a){if(!a){return 0}var c=0;for(var b in a){if(!a.hasOwnProperty(b)){continue}c+=Object.keys(a[b].frags).length}return c};PreviewPlayer.prototype._getAudioOffsetList=function(a){if(!a){return[]}for(var b in a){if(!a.hasOwnProperty(b)){continue}return Object.keys(a[b].frags).map(function(c){var d=parseInt(c);return isNaN(d)?0:Math.floor(d/FPS)})}};

}
