"use strict";function del(e){return api.subtitles.delay.bind(null,e)}"https:"===location.protocol&&(location="http"+location.href.substr(5)),function(){window.canvasTmp=function(e){var i,t,n=document.createElement("canvas"),l=n.getContext("2d");return t=n.width=e.videoWidth,i=n.height=e.videoHeight,l.drawImage(e,0,0,t,i),n}}(),function(){window.isOpera=!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,window.isFirefox="undefined"!=typeof InstallTrigger,window.isSafari=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0,window.isIE=!!document.documentMode,window.isEdge=!isIE&&!!window.StyleMedia,window.isChrome=!!window.chrome&&!!window.chrome.webstore,window.isBlink=(isChrome||isOpera)&&!!window.CSS,window.utils={secondsToString:function(e){var i=~~(e%60),t=~~(e/60)%60,n=~~(e/3600);return 10>i&&(i="0"+i),10>t&&(t="0"+t),(n?n+":":"")+t+":"+i},range:function(e,i,t,n){var l=+i;return i.length&&"="===i[1]&&(l=(n||0)+i.substr(2)*(i[0]+"1")),Math.min(Math.max(e,l),t)},fPercent:function(e){return Math.round(100*e)+" %"}}}(),function(){window.dom={window:$(window),doc:$(document),body:$(document.body),title:$("title"),fileplayer:$(".fileplayer"),screen:$(".screen"),screenImage:$(".screen .image"),screenBrightness:$(".screen .brightnessWrapper"),screenVideo:$(".screen video.webaudio"),screenVideoDistant:$(".screen video:not(.webaudio)"),screenCanvas2d:$(".screen canvas.2d"),screenCanvasWebgl:$(".screen canvas.webgl"),screenFilename:$(".screen .filenameWrapper"),screenFilenameText:$(".screen .filename"),screenShortcutText:$(".screen .shortcutDesc"),screenCueWrapper:$(".screen .cues"),screenCue:$(".screen .cues > *"),numVersion:$(".screen .num"),playlist:$(".playlist"),playlistExtendWidth:$(".playlist .extendWidth"),playlistContent:$(".playlist .content"),playlistList:$(".playlist .list"),playlistInputFile:$(".playlist input[type='file']"),playlistNav:$(".playlist nav"),playlistNavIndex:$(".playlist nav .current"),playlistNavTotal:$(".playlist nav .total"),playlistForm:$(".playlist nav form"),playlistInputURL:$(".playlist nav input"),playlistShuffleBtn:$(".playlist nav .shuffle"),playlistRepeatBtn:$(".playlist nav .repeat"),playlistCloseBtn:$(".playlist nav .close"),ctrl:$(".ctrl"),ctrlCutesliderPosition:$(".ctrl .cuteslider.position"),ctrlSliderPosTrack:$(".ctrl .cuteslider.position .cuteslider-track"),ctrlInputRangePosition:$(".ctrl .cuteslider.position input"),ctrlThumbnail:$(".ctrl .thumbnail"),ctrlThumbnailVideo:$(".ctrl .thumbnail video"),ctrlThumbnailCanvas:$(".ctrl .thumbnail canvas"),ctrlOpenBtn:$(".ctrl .open"),ctrlPlayBtn:$(".ctrl .play"),ctrlStopBtn:$(".ctrl .stop"),ctrlPrevBtn:$(".ctrl .prev"),ctrlNextBtn:$(".ctrl .next"),ctrlVolumeIcon:$(".ctrl .volume .fa"),ctrlVolumeSlider:$(".ctrl .volume input"),ctrlTimeText:$(".ctrl .txt.position"),ctrlTimeCurrent:$(".ctrl .position .current"),ctrlTimeRemaining:$(".ctrl .position .remaining"),ctrlTimeDuration:$(".ctrl .position .duration"),ctrlCaptureBtn:$(".ctrl .btn.capture"),ctrlVisualBtn:$(".ctrl .btn.visu"),ctrlVisualIcon:$(".ctrl .visu .fa"),ctrlVisualToggle:$(".ctrl .visu .slidebutton"),ctrlVisualCheckbox:$(".ctrl .visu input"),ctrlVisualList:$(".ctrl .visu ul"),ctrlBrightnessIcon:$(".ctrl .brightness > .fa"),ctrlBrightnessSlider:$(".ctrl .brightness input"),ctrlBrightnessValue:$(".ctrl .brightness .val"),ctrlSpeedIcon:$(".ctrl .speed > .fa"),ctrlSpeedSlider:$(".ctrl .speed input"),ctrlSpeedValue:$(".ctrl .speed .val"),ctrlSubtitlesBtn:$(".ctrl .btn.subtitles"),ctrlSubtitlesIcon:$(".ctrl .subtitles .fa"),ctrlSubtitlesToggle:$(".ctrl .subtitles .slidebutton"),ctrlSubtitlesCheckbox:$(".ctrl .subtitles input"),ctrlSubtitlesList:$(".ctrl .subtitles ul"),ctrlPlaylistBtn:$(".ctrl .btn-playlist"),ctrlFullscreenBtn:$(".ctrl .btn.fullscreen")};for(var e in dom)0===dom[e].length&&console.error("dom."+e+" is empty.");dom.empty=$()}(),function(){var e=!1;window.api={version:"0.8.19",thumbnail:{}},window.ui={},dom.numVersion.text(api.version),document.body.onload=function(){e||(lg("body loaded"),e=!0,dom.fileplayer.addClass("ready"))},setTimeout(document.body.onload,3e3)}(),function(){function e(e){t&&(o.gain.value=e*e*e),u.volume=e*e*e,ui.volume(r=e),Cookies.set("volume",e,{expires:365})}var i,t,n,l,o,r,a,s=dom.screenVideo[0],u=dom.screenVideoDistant[0];s.volume=1,window.AudioContext&&(t=new AudioContext,l=t.createAnalyser(),o=t.createGain(),o.gain.value=1,n=t.createMediaElementSource(s),n.connect(l),l.connect(o),o.connect(t.destination)),api.audio=i={ctx:t,analyser:l,volume:function(t){return 0===arguments.length?r:(e(utils.range(0,t,1,r)),a=r,i)},mute:function(){return a=r,e(0),i},unMute:function(){return e(a||1),i},isMuted:function(){return 0===r},muteToggle:function(e){return"boolean"!=typeof e&&(e=!i.isMuted()),e?i.mute():i.unMute()}}}(),function(){$.extend(api,{capture:function(){var e,i=api.video.currentTime(),t=~~(i/3600),n=~~(i/60)%60,l=i%60,o=api.playlist.selectedFile();return 10>n&&(n="0"+n),l=(10>l?"0":"")+l.toFixed(2),e="audio"===o.type?ui.visualizerCanvas():canvasTmp(api.videoElement),{href:e.toDataURL(),download:o.name.replace(/\s/g,"_")+"__at_"+t+"h"+n+"m"+l+"s.png"}}})}(),function(){var e;api.error=e={"throw":function(i,t){var n,l;switch(i){case"INVALID_FORMAT":n="Incompatible file format",l='The file "'+t.filename+'" can not be played. Its format ('+t.format+") is not compatible with the <video> HTML5 standard element.";break;case"UNKNOWN_EXT":n="Incompatible file format",l='The file "'+t.filename+"\" can not be played. Its format is not recognized or maybe your browser doesn't support folders.";break;case"INVALID_URL":n="URL, HTTP error "+t.code,l='Can not access to the URL :\n"'+t.url+'" (error '+t.code+").";break;case"URL_NOT_CORS":n="URL, security, CORS error",l='The URL "'+t.url+"\" can't be reached.";break;case"CTRLO_SHORTCUT":n="Browser drawback, security",l="Ctrl+O is not working on your browser. Use the folder icon (in the lower left corner) or drag and drop your files directly.";break;case"WEBAUDIO":n="Browser drawback",l="WebAudio is not supported by your browser so, the sound visualiser is disable. Use a modern browser for a better experience.";break;case"NO_FOLDERS":n="Browser drawback",l="Folders are not supported by your browser.",l+=t?' "'+t.filename+"\" can't be played.":""}return setTimeout(function(){alert(n+" :\n\n"+l)},1),e}}}(),function(){var e="mp3-ogg-wav-weba",i="mp4-ogm-mpeg-mpg-webm",t="mp3-mp4-mpeg-ogg-wav-webm-mpg-weba-ogm-srt-vtt".split("-");api.file=function(n){var l,o=n.name||n.url,r=o.match(/([^\/?#]*)\.([^.\/?#]+)/g);this.name=o,r&&(r=r[r.length-1],l=r.lastIndexOf("."),this.name=r,l>=0&&(this.name=r.substr(0,l),this.extension=r.substr(l+1).toLowerCase())),this.isSupported=$.inArray(this.extension,t)>-1,this.isLocal=!!n.name,this.isSupported&&(this.type=e.indexOf(this.extension)>-1?"audio":i.indexOf(this.extension)>-1?"video":"text",this.isLocal?this.dataFile=n:(this.url=o,this.cors=n.cors))},api.file.prototype={createURL:function(){return this.isLocal&&(this.url=URL.createObjectURL(this.dataFile)),this},revokeURL:function(){return this.isLocal&&URL.revokeObjectURL(this.url),this}}}(),function(){$.extend(document,{fullscreen:function(e){e.requestFullscreen=e.requestFullscreen||e.msRequestFullscreen||e.mozRequestFullScreen||e.webkitRequestFullscreen||$.noop,e.requestFullscreen()},exitFullscreen:document.exitFullscreen||document.msExitFullscreen||document.mozCancelFullScreen||document.webkitCancelFullScreen||$.noop,toggleFullscreen:function(e,i){1===arguments.length&&(i=!document.isFullscreen()),i?document.fullscreen(e):document.exitFullscreen()},isFullscreen:function(){return document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen||null!=document.msFullscreenElement||!1}})}(),function(){var e,i,t,n,l,o,r=[],a={ENTER:13,LEFT:37,UP:38,RIGHT:39,DOWN:40,PLUS:107,MINUS:109};for(i=0;12>i;++i)a["F"+(i+1)]=112+i;api.keyboard=e={shortcut:function(i,s){return t=n=l=!1,i.toUpperCase().split("+").forEach(function(e){switch(e){case"CTRL":t=!0;break;case"SHIFT":n=!0;break;case"ALT":l=!0;break;default:o=a[e]||e.charCodeAt(0)}}),r.push({ctrl:t,shift:n,alt:l,key:o,fn:s}),e}},dom.doc.keydown(function(e){for(var i,t=0;i=r[t];++t)if(i.key===e.keyCode&&i.ctrl===(e.ctrlKey||e.metaKey)&&i.shift===e.shiftKey&&i.alt===e.altKey)return i.fn(),!1})}(),function(){$.extend(api,{isLoading:!1,isLoaded:!1,videoElement:dom.screenVideo,loadFile:function(e){var i=e.isLocal||e.cors,t=i&&!!api.audio.ctx,n=api.video.loop();return api.video.pause(),api.isLoading=!0,api.isLoaded=!1,api.video.type=e.type,dom.fileplayer.toggleClass("webaudio",t),api.videoElement=(t?dom.screenVideo:dom.screenVideoDistant)[0],api.videoElement.src=e.url,api.video.loop(n),"video"===e.type&&dom.ctrlThumbnailVideo.attr({crossOrigin:i?"anonymous":null,src:e.url}),ui.loading().seeking(),api},fileLoaded:function(){return api.isLoading=!1,api.isLoaded=!0,api.imageRatio=api.videoElement.videoWidth/api.videoElement.videoHeight,api.video.playbackRate(1),ui.updimVideo().updimSubtitles(),api}})}(),function(){var e,i,t=!1,n=dom.empty,l=dom.empty,o=dom.playlistList;api.playlist=e={dialogueFiles:function(){return dom.playlistInputFile.click(),e},addFiles:function(i,t){function n(e,i,t,n){var l=new Promise(function(e,n){i.onload=function(i){return o.push(t),e(t)},i.onerror=function(i){return api.error["throw"]("NO_FOLDERS",{filename:t.name}),e(t)}});return i.readAsText(n),l}var l,o=[],r=[],a=[];return $.each(i,function(e){var i,t=new api.file(this);t.index=e,"text"===t.type?r.push(t):"audio"!==t.type&&"video"!==t.type&&window.isFirefox&&(i=new FileReader(this))?a.push(n(e,i,t,this)):o.push(t)}),Promise.all(a).then(function(){o.sort(function(e,i){return e.index-i.index}),l=ui.listAdd(o),ui.listUpdate().totalFiles(),t&&l.length&&e.select(l[0]),$.each(r,function(){api.subtitles.newTrack(this)})}),e},extractAddFiles:function(i,t){function n(){0===--a&&e.addFiles(s,t)}function l(e){e.isFile?e.file(function(e){s.push(e),n()}):e.isDirectory&&(r=e.createReader(),r.readEntries(function(e){a+=e.length,n(),$.each(e,function(){l(this)})}))}var o,r,a=i.length,s=[];return $.each(i,function(){(o=this.webkitGetAsEntry())&&l(o)}),e},select:function(i,t){if(i){var n=i.fileWrapper;n.createURL(),l.length&&l[0]!==i&&l[0].fileWrapper.revokeURL(),ui.seeking().fileSelect(i.jqThis).indexFile(),api.subtitles.disable(),t||ui.scrollToSelection(),l=i.jqThis,n.isSupported?(api.loadFile(n),api.video.play()):(api.error["throw"](n.extension?"INVALID_FORMAT":"UNKNOWN_EXT",{filename:n.name,format:n.extension}),api.video.stop())}else api.video.stop();return e},selectedFile:function(){return(l[0]||null)&&l[0].fileWrapper},prev:function(){return e.select(l.prev()[0]||ui.jqFiles.get(-1))},next:function(){return e.select(l.next()[0]||ui.jqFiles.get(0))},shuffle:function(i){if("boolean"!=typeof i&&(i=!t),i!==t){var r=ui.jqFiles.length;i?r>1&&(n=o.children(),ui.jqFiles.each(function(){ui.jqFiles.eq(Math.floor(Math.random()*r)).after(this)}),o.prepend(l)):o.prepend(n),ui.shuffle(t=i).listUpdate().indexFile().scrollToSelection()}return e},repeat:function(t){return arguments.length?(i=t,api.video.loop("loopOne"===t),ui.repeat(t),Cookies.set("playlistmode",t,{expires:365}),e):i}}}(),function(){var e;api.request=e={checkCORS:function(i,t){var n=0;return $.ajax({url:i,dataType:"text",xhrFields:{onprogress:function(e){n++||(t(200<=this.status&&this.status<300),this.abort())}},error:function(){n++||t(!1)},success:function(){n++||t(!0)}}),e}}}(),function(){var e,i;api.screen=e={brightness:function(t){return 0===arguments.length?i:(i=utils.range(0,t,1,i),ui.brightness(i),Cookies.set("brightness",i,{expires:365}),e)},brightnessToggle:function(t){return"boolean"!=typeof t&&(t=1>i),e.brightness(t?1:.25)}}}(),function(){function e(e){function i(e){var i=e.split(":");return i[2]=+i[2].replace(",","."),3600*i[0]+60*i[1]+i[2]}for(var t,n,l,o,r=0,a=[],s=e.split(/\s*\n\s*\n/);t=s[r++];)t=/\d+.*\s+([\d:,.]+)\s*-->\s*([\d:,.]+).*\s+((.|\s)*)/.exec(t),t&&a.push({id:a.length+1,startTime:i(t[1]),endTime:i(t[2]),text:t[3].replace(/\s*\n\s*/g,"<br>")});for(a.map=o=new Array(~~a[a.length-1].endTime+1),r=0;t=a[r];++r)for(n=~~t.startTime,l=~~t.endTime;l>=n;++n)o[n]||(o[n]=t);return a}var i,t,n=dom.empty,l=!1,o=0;api.subtitles=i={newTrack:function(l){var o=new FileReader;return o.onloadend=function(){var r=e(o.result),a=$("<li>");a.text(l.dataFile.name).appendTo(dom.ctrlSubtitlesList).click(function(){t=r,n.removeClass("selected"),n=a.addClass("selected"),ui.subtitlesCue(i.findCue()),api.subtitles.enable()}).click()},o.readAsText(l.dataFile),i},isEnable:function(){return l},enable:function(){return ui.subtitlesToggle(l=!0),i},disable:function(){return ui.subtitlesToggle(l=!1),i},toggle:function(e){return"boolean"!=typeof e&&(e=!l),e?i.enable():i.disable()},findCue:function(){if(l&&t){var e=api.video.currentTime()+o,i=t.map[~~e];if(i)do{if(e<i.startTime)return;if(e<=i.endTime)return i}while(i=t[i.id]);return i}},delay:function(e){return arguments.length?(ui.subtitlesDelay(o=utils.range(-(1/0),e,+(1/0),o)),i):o}}}(),function(){var e;dom.screenVideo[0].crossOrigin="anonymous",api.video=e={isStopped:!0,isPlaying:!1,play:function(){if(!e.isPlaying){var i=api.playlist.selectedFile();api.isLoaded||api.isLoading?(e.isStopped=!1,e.isPlaying=!0,api.videoElement.play(),ui.play()):i?api.playlist.select(i.element):api.playlist.dialogueFiles()}return e},pause:function(){return e.isPlaying&&(e.isPlaying=!1,api.videoElement.pause(),ui.pause()),e},playToggle:function(i){return"boolean"!=typeof i&&(i=!e.isPlaying),i?e.play():e.pause()},stop:function(){return e.isStopped||(e.pause().currentTime(0),api.isLoaded=e.isPlaying=!1,e.isStopped=!0,dom.ctrlThumbnailVideo[0].pause(),ui.canvas2d.toggle(!1),ui.stop()),e},duration:function(){return!e.isStopped&&api.videoElement.duration||0},currentTime:function(i){return 0===arguments.length?api.videoElement.currentTime:(api.videoElement.currentTime=utils.range(0,i,api.videoElement.duration,api.videoElement.currentTime),e)},loop:function(i){return 0===arguments.length?api.videoElement.loop:(api.videoElement.loop=!!i,e)},playbackRate:function(i){return 0===arguments.length?api.videoElement.playbackRate:(api.videoElement.playbackRate=i,ui.speed(i),e)}}}(),function(){var e,i,t=[];api.thumbnail.cache=e={init:function(n){return i=0,t=new Array(n),e},newImage:function(n,l){return t[n]=l,++i,e},getImage:function(e,i){var n;if(e=~~e,i)for(var l=0;i>l&&!(n=t[e-l]||t[e+l]);++l);else n=t[e];return n}}}(),function(){var e,i=dom.ctrlThumbnailVideo[0],t=dom.ctrlThumbnailCanvas,n=t[0],l=n.getContext("2d"),o=t.width(),r=t.height(),a=o/r,s=null;n.width=o,n.height=r,api.thumbnail.canvas=e={drawFromImg:function(i){return i?i!==s&&l.putImageData(s=i,(o-i.width)/2,(r-i.height)/2):s&&(s=null,l.clearRect(0,0,o,r)),e},drawFromVideo:function(){var t,n,u,c;return api.imageRatio>a?(u=o,c=o/api.imageRatio,t=0,n=(r-c)/2):(u=r*api.imageRatio,c=r,t=(o-u)/2,n=0),l.drawImage(i,t,n,u,c),s=l.getImageData(t,n,u,c),api.thumbnail.cache.newImage(~~i.currentTime,s),e}}}(),ui.actionDescEnable=!0,ui.actionDesc=function(e){return ui.actionDescEnable&&(clearTimeout(ui.actionDescTimeoutId),dom.screenShortcutText.text(e).removeClass("hidden"),ui.actionDescTimeoutId=setTimeout(function(){dom.screenShortcutText.addClass("hidden")},2e3)),ui},ui.brightness=function(e){return dom.screenBrightness.css("opacity",e),dom.ctrlBrightnessSlider.element().val(e),dom.ctrlBrightnessIcon.removeClass("fa-moon-o fa-lightbulb-o").addClass(.5>e?"fa-moon-o":"fa-lightbulb-o"),dom.ctrlBrightnessValue.text(utils.fPercent(e)),ui},ui.bufferedDivs=[],ui.bufferedDivsVisible=0,ui.buffered=function(){var e,i,t,n=api.video.duration(),l=api.videoElement.buffered,o=l.length;for(e=o-ui.bufferedDivs.length;e-- >0;)t=$("<div class='buffer'>").hide(),ui.bufferedDivs.push({jqBuf:t}),dom.ctrlSliderPosTrack.append(t);if(i=ui.bufferedDivs.length,ui.bufferedDivsVisible!==o){for(e=0;i>e;++e)ui.bufferedDivs[e].jqBuf.toggle(o>e);ui.bufferedDivsVisible=o}for(e=0;o>e;++e){var r=l.start(e),a=l.end(e),s=ui.bufferedDivs[e];s.b!==a&&(s.b=a,s.jqBuf.css({left:r/n*100+"%",width:(a-r)/n*100+"%"}))}return ui},function(){function e(e,i){this.displayed=!1,this.ctxType=i,this.jqCanvas=e,this.canvas=e[0],this.ctx=e[0].getContext(i),this.render(null)}e.prototype={render:function(e,i){return this.frameFn=e||$.noop,this.frameObj=$.extend(i,{ctxCanvas:this.ctx}),this},frame:function(e){this.frameObj.timestamp=e,this.frameFn(this.frameObj),this.displayed&&(this.requestId=requestAnimationFrame(this.frame.bind(this)))},toggle:function(e){return"boolean"!=typeof e&&(e=!this.displayed),this.displayed=e,"2d"===this.ctxType&&this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),e?this.requestId||(this.requestId=requestAnimationFrame(this.frame.bind(this))):(cancelAnimationFrame(this.requestId),this.requestId=null),this.jqCanvas.css("display",e?"block":"none"),this}},ui.canvas2d=new e(dom.screenCanvas2d,"2d"),ui.canvasWebgl=new e(dom.screenCanvasWebgl,"webgl")}(),ui.currentTime=function(e){return ui.subtitlesCue(api.subtitles.findCue()),dom.ctrlCutesliderPosition.element().val(e),dom.ctrlTimeCurrent.text(utils.secondsToString(e)),dom.ctrlTimeRemaining.text(utils.secondsToString(api.video.duration()-e)),clearTimeout(ui.seekTimeout),api.video.isPlaying&&(ui.seekTimeout=setTimeout(ui.seeking,700)),ui},ui.duration=function(e){return dom.ctrlTimeDuration.text(utils.secondsToString(e)),ui},ui.fileDetach=function(e){return e&&(e.addClass("dragging"),ui.fileDetachTimeoutId=setTimeout(function(){e.detach(),ui.listUpdate()},200)),ui},ui.fileReattach=function(e){return clearTimeout(ui.fileDetachTimeoutId),ui.listAdd(e),setTimeout(function(){e.removeClass("dragging")},1),ui},ui.jqFileSelected=dom.empty,ui.fileSelect=function(e){function i(e,i,t){i=i&&i.fileWrapper,e[0].dataset.tooltipContent=i?t+"&nbsp;: <span class='filename' data-type='"+i.type+"'>"+i.name+"</span>":""}var t=e[0].fileWrapper;return i(dom.ctrlPrevBtn,e.prev()[0]||ui.jqFiles.get(-1),"Previous"),i(dom.ctrlNextBtn,e.next()[0]||ui.jqFiles[0],"Next"),ui.jqFileSelected.removeClass("selected"),ui.jqFileSelected=e.addClass("selected"),ui.canvas2d.toggle("audio"===t.type&&ui.visualizerIsOn),ui},ui.fullscreenToggle=function(e){return"boolean"!=typeof e&&(e=!document.isFullscreen()),e?(ui.listWasOpen=ui.listIsOpen,ui.listOpenToggle(!1)):ui.listWasOpen&&ui.listOpenToggle(!0),dom.ctrlFullscreenBtn.removeClass("fa-compress fa-expand").addClass(e?"fa-compress":"fa-expand").attr("data-tooltip-content",e?"Exit full screen":"Full screen"),ui},ui.listAdd=function(e){var i="",t=e;return e.jquery||($.each(e,function(){i+="<a class='file' href='/' draggable='true'><div class='content textOverflow'><span class='filename' data-type='"+this.type+"'>"+this.name+"</span></div></a>"}),t=$(i).click(!1).dblclick(function(){return api.playlist.select(this,"noscroll"),!1}).each(function(i){e[i].element=this,this.fileWrapper=e[i],this.jqThis=$(this)})),ui.jqDragover===dom.playlistList?t.appendTo(dom.playlistList):ui.jqDragover&&t.insertBefore(ui.jqDragover),ui.listDragOver(null).listUpdate(),t},ui.jqDragover=dom.playlistList,ui.listDragOver=function(e){if(e!==ui.jqDragover){if(ui.jqDragover&&ui.jqDragover.removeClass("dragover"),e===dom.screen){var i,t=api.playlist.selectedFile();t&&(t=t.element.jqThis.next(),t.length&&(i=t[0].jqThis)),e=i||dom.playlistList}ui.jqDragover=e,e&&e.addClass("dragover")}return ui},ui.listIsOpen=!1,ui.listOpenToggle=function(e){return"boolean"!=typeof e&&(e=!ui.listIsOpen),ui.listIsOpen=e,dom.fileplayer.toggleClass("list-open",e),e?(ui.showCtrl(),setTimeout(ui.updimFilename,250)):(ui.hideCtrl().updimFilename(),dom.playlistInputURL.blur()),dom.ctrlPlaylistBtn[0].dataset.tooltipContent=e?"Hide playlist":"Show playlist",Cookies.set("playlistshow",e,{expires:365}),ui},ui.jqFiles=dom.empty,ui.listUpdate=function(){return ui.jqFiles=dom.playlistList.children(),ui},ui.indexFile=function(){return dom.playlistNavIndex.text(1+ui.jqFiles.index(ui.jqFileSelected)),ui},ui.totalFiles=function(){return dom.playlistNavTotal.text(ui.jqFiles.length),ui},ui.listWidth=function(e){return dom.playlist.css("width",e+"%"),ui.percListWidth=dom.playlist.width()/ui.pxScreenWidth*100,ui.listIsOpen&&ui.updimFilename(),Cookies.set("playlistwidth",e,{expires:365}),ui},ui.loading=function(){var e=api.playlist.selectedFile();return dom.fileplayer.removeClass("audio video").addClass("playing "+e.type),dom.screenFilenameText.attr("data-type",e.type).add(dom.title).text(e.name),dom.ctrlCutesliderPosition.element().val(0),dom.ctrlCutesliderPosition.parent().attr("data-tooltip-content",null),api.thumbnail.canvas.drawFromImg(),ui},ui.loaded=function(){var e=api.video.duration();return dom.ctrlInputRangePosition.attr("max",e),api.thumbnail.cache.init(Math.ceil(e)),ui},ui.play=function(){return dom.ctrlPlayBtn.removeClass("fa-play").addClass("fa-pause"),ui.actionDesc("Play")},ui.pause=function(){return dom.ctrlPlayBtn.removeClass("fa-pause").addClass("fa-play"),ui.actionDesc("Pause")},ui.repeat=function(e){var i="<i class='repeatDot fa fa-circle'></i>";return dom.playlistRepeatBtn.removeClass("disable one all").addClass(e===!0?"":"loopOne"===e?"one":"loopAll"===e?"all":"disable").attr("data-tooltip-content","Playing mode&nbsp;:<br/><br/>"+(e===!1?i:"")+"&nbsp;&nbsp;stop after file<br/>"+(e===!0?i:"")+"&nbsp;&nbsp;stop after playlist<br/>"+("loopOne"===e?i:"")+"&nbsp;&nbsp;repeat one<br/>"+("loopAll"===e?i:"")+"&nbsp;&nbsp;repeat playlist<br/>"),ui},ui.scrollToSelection=function(){var e,i,t,n,l,o=3.25,r=dom.playlistList.children(".selected");return r.length&&(i=r.position().top,n=i-dom.playlistList[0].scrollTop,l=r.outerHeight(),(e=0>n)?i-=o*l:(t=dom.playlistList.height()-50,(e=n>t-l)&&(i-=t-++o*l)),e&&dom.playlistList.stop().animate({scrollTop:i},250)),ui},ui.seekTimeout=null,ui.isSeeking=!1,ui.seeking=function(){return ui.isSeeking||(ui.isSeeking=!0,dom.fileplayer.addClass("seeking")),ui},ui.seeked=function(){return clearTimeout(ui.seekTimeout),ui.isSeeking&&(ui.isSeeking=!1,dom.fileplayer.removeClass("seeking")),ui},ui.shuffle=function(e){return dom.playlistShuffleBtn.toggleClass("enable",e).attr("data-tooltip-content","Shuffle <i class='fa fa-toggle-"+(e?"on":"off")+"'></i>"),ui},ui.speed=function(e){var i=e.toFixed(2)+"x";return dom.ctrlSpeedSlider.element().val(e),dom.ctrlSpeedValue.text(i),ui.actionDesc("Speed : "+i)},function(){var e=dom.ctrlCutesliderPosition.parent();ui.stop=function(){return dom.fileplayer.removeClass("playing audio video"),dom.screenFilenameText.empty(),dom.title.text("FilePlayer"),api.thumbnail.canvas.drawFromImg(),e.attr("data-tooltip-content",null),ui.pause().currentTime(0).duration(0).actionDesc("stop")}}(),function(){var e;ui.subtitlesToggle=function(e){return ui.subtitlesCue(e?api.subtitles.findCue():null),dom.ctrlSubtitlesBtn.toggleClass("disable",!e),dom.ctrlSubtitlesCheckbox.attr("checked",e?"checked":null),ui},ui.subtitlesCue=function(i){return i!==e&&((e=i)?dom.screenCue.html(i.text):dom.screenCue.empty()),ui},ui.subtitlesDelay=function(e){return ui.actionDesc("Subtitles delay : "+e.toFixed(3)+" s").subtitlesCue(api.subtitles.findCue())}}(),function(){var e,i,t,n={},l=api.audio.analyser;l&&(l.fftSize=4096,e={analyser:l,data:new Uint8Array(l.frequencyBinCount)}),ui.visualizerIsOn=!1,ui.visualizerCanvas=function(){return ui.visualizerIsOn&&i.canvas},ui.visualizerAdd=function(e,i,t){return n[e]={ctxType:i,frame:t,jqLi:$("<li>"+e+"</li>").appendTo(dom.ctrlVisualList).click(ui.visualizerSelect.bind(null,e))},ui},ui.visualizerSelect=function(l){if(t!==n[l]){t&&t.jqLi.removeClass("selected"),t=n[l],t.jqLi.addClass("selected");var o="2d"===t.ctxType?ui.canvas2d:ui.canvasWebgl;i!==o&&(i&&i.toggle(!1),i=o,ui.visualizerIsOn&&i.toggle(!0)),i.render(t.frame,e)}return ui},ui.visualizerToggle=function(e){return"boolean"!=typeof e&&(e=!ui.visualizerIsOn),e&&!api.audio.ctx&&(e=!1,api.error["throw"]("WEBAUDIO")),"audio"===api.video.type&&i.toggle(e),dom.ctrlVisualBtn.toggleClass("disable",!e),dom.ctrlVisualCheckbox.attr("checked",e?"checked":null),ui.visualizerIsOn=e,ui}}(),ui.volume=function(e){return dom.ctrlVolumeIcon.removeClass("fa-volume-off fa-volume-down fa-volume-up").addClass(e?.5>e?"fa-volume-down":"fa-volume-up":"fa-volume-off"),dom.ctrlVolumeSlider.element().val(e),ui.actionDesc("Volume : "+utils.fPercent(e))},ui.windowResize=function(){return ui.updimScreen().updimVideo().updimList().updimFilename().updimCanvas().updimSubtitles()},ui.updimCanvas=function(){var e=dom.screenCanvas2d[0],i=dom.screenCanvasWebgl[0];return e.width=i.width=ui.pxScreenWidth,e.height=i.height=ui.pxScreenHeight,ui},ui.updimFilename=function(){return dom.screenFilename.css("width",ui.listIsOpen?100-ui.percListWidth+"%":"100%"),ui},ui.updimList=function(){return ui.percListWidth=dom.playlist.width()/ui.pxScreenWidth*100,ui},ui.updimScreen=function(){var e=dom.screenVideo.width(),i=dom.screenVideo.height();return ui.pxScreenWidth=e,ui.pxScreenHeight=i,ui.screenRatio=e/i,ui},ui.updimSubtitles=function(){var e=(ui.pxScreenHeight-ui.pxVideoHeight)/2;return dom.screenCueWrapper.toggleClass("isUnderCtrl",80>e).css({bottom:e,fontSize:Math.max(10,ui.pxVideoWidth/100*2.5)+"px"}),ui},ui.updimVideo=function(){var e=api.imageRatio,i=ui.pxScreenWidth,t=ui.pxScreenHeight;return ui.pxVideoWidth=e>ui.screenRatio?i:t*e,ui.pxVideoHeight=e<ui.screenRatio?t:i/e,ui},dom.ctrlBrightnessSlider.change(function(){api.screen.brightness(this.value)}),dom.ctrlBrightnessIcon.click(api.screen.brightnessToggle),dom.ctrlCaptureBtn.click(function(){api.isLoaded&&dom.ctrlCaptureBtn.attr(api.capture())}),function(){var e,i;ui.showCtrl=function(){return clearTimeout(e),clearTimeout(i),dom.fileplayer.removeClass("ctrlHiding ctrlHidden").addClass("ctrlVisible"),ui},ui.hideCtrl=function(){return clearTimeout(e),ui.listIsOpen||(dom.fileplayer.addClass("ctrlHiding"),i=setTimeout(function(){dom.fileplayer.removeClass("ctrlVisible").addClass("ctrlHidden")},2e3)),ui},dom.fileplayer.mouseleave(ui.hideCtrl).add(dom.ctrl).mouseenter(ui.showCtrl),dom.screen.mousemove(function(){ui.showCtrl(),e=setTimeout(ui.hideCtrl,500)})}(),function(){function e(){r&&(ui.fileReattach(r),l&&api.playlist.select(r[0]),r=null),ui.listDragOver(null),o=!1,a=!1}function i(){s=Math.max(ui.jqFiles.outerHeight(),ui.jqFiles.eq(1).outerHeight())}dom.playlistInputFile.change(function(){ui.listDragOver(dom.screen),api.playlist.addFiles(this.files,!0)}),dom.ctrlOpenBtn.click(api.playlist.dialogueFiles),api.keyboard.shortcut("ctrl+o",function(){window.isFirefox&&api.error["throw"]("CTRLO_SHORTCUT"),api.playlist.dialogueFiles()});var t,n,l,o,r,a,s;dom.body.on({dragover:function(e){var r,a,u=e.pageX,c=e.pageY;return o=!0,u===t&&c===n||(t=u,n=c,!ui.listIsOpen||u<(1-ui.percListWidth/100)*ui.pxScreenWidth?(l=!0,ui.listDragOver(dom.screen)):(l=!1,a=dom.playlistList.position().top,c>=a&&(c=c-a+dom.playlistList[0].scrollTop,i(),r=ui.jqFiles.eq(Math.round(c/s)),ui.listDragOver(r[0]?r[0].jqThis:dom.playlistList)))),!1},drop:function(i){i=i.originalEvent;var t=i&&i.dataTransfer;return r?e():t&&(t.items?api.playlist.extractAddFiles(t.items,l):t.files&&(t.files.length?api.playlist.addFiles(t.files,l):api.error["throw"]("NO_FOLDERS"))),o=a=!1,!1},dragstart:function(e){a=!0,ui.listDragOver(dom.playlistList),o=!0,r=e.target.jqThis,ui.fileDetach(r)},dragend:function(){return e(),!1},dragbetterenter:function(){a=!1},dragbetterleave:function(){o&&(a=!0,l=!1,ui.listDragOver(dom.playlistList))},mousemove:function(){a&&e()}})}(),dom.playlistForm.submit(function(){var e=dom.playlistInputURL.val();return ui.seeking(),dom.playlistInputURL.val("").blur(),api.request.checkCORS(e,function(i){ui.listDragOver(dom.screen),api.playlist.addFiles([{url:e,cors:i}],!0)}),!1}),dom.playlistInputURL.keydown(function(e){e.stopPropagation()}),function(){var e=!1,i=dom.playlistExtendWidth;api.keyboard.shortcut("ctrl+l",ui.listOpenToggle),dom.ctrlPlaylistBtn.click(ui.listOpenToggle),dom.playlistCloseBtn.click(ui.listOpenToggle.bind(ui,!1)),i.mousedown(function(){e=!0,dom.body.addClass("ew-resize no-select"),i.addClass("hover")}),dom.doc.mouseup(function(){e=!1,dom.body.removeClass("ew-resize no-select"),i.removeClass("hover")}).mousemove(function(i){e&&ui.listWidth(100-i.originalEvent.pageX/ui.pxScreenWidth*100)})}(),dom.ctrlStopBtn.click(api.video.stop),dom.ctrlPlayBtn.click(api.video.playToggle),api.keyboard.shortcut("s",api.video.stop).shortcut(" ",api.video.playToggle),function(){function e(e){if(!api.video.isStopped){api.video.currentTime(e);var i=api.video.currentTime();ui.currentTime(i).actionDesc(utils.secondsToString(i)+" / "+utils.secondsToString(api.video.duration()))}}dom.ctrlInputRangePosition.change(function(){api.video.isStopped||api.video.currentTime(this.value)}),dom.ctrlTimeText.click(function(){dom.ctrlTimeText.toggleClass("remaining")}),api.keyboard.shortcut("left",e.bind(null,"-=1")).shortcut("right",e.bind(null,"+=1")).shortcut("shift+left",e.bind(null,"-=3")).shortcut("shift+right",e.bind(null,"+=3")).shortcut("alt+left",e.bind(null,"-=10")).shortcut("alt+right",e.bind(null,"+=10")).shortcut("ctrl+left",e.bind(null,"-=60")).shortcut("ctrl+right",e.bind(null,"+=60"))}(),function(){var e=[!1,!0,"loopOne","loopAll"];dom.playlistShuffleBtn.click(api.playlist.shuffle),dom.playlistRepeatBtn.click(function(){api.playlist.repeat(e[(1+$.inArray(api.playlist.repeat(),e))%e.length])}),api.keyboard.shortcut("p",api.playlist.prev).shortcut("n",api.playlist.next),dom.ctrlPrevBtn.click(api.playlist.prev),dom.ctrlNextBtn.click(api.playlist.next)}(),function(){function e(){document.toggleFullscreen(document.documentElement)}dom.window.resize(ui.windowResize),dom.ctrlFullscreenBtn.click(e),api.keyboard.shortcut("F11",e),dom.screen.dblclick(e),dom.doc.on("fullscreenchange MSFullscreenChange mozfullscreenchange webkitfullscreenchange",function(){lg("ON: fullscreenchange"),ui.fullscreenToggle(document.isFullscreen())})}(),function(){var e;dom.playlist.mouseenter(function(){dom.playlistList.stop(),clearTimeout(e)}).mouseleave(function(){e=setTimeout(ui.scrollToSelection,1500)})}(),function(){function e(e){for(var n,l=1,o=api.video.playbackRate();t>l;++l)if(o<=i[l]){n=i[0>e?l-1:l+ +(o===i[l])];break}api.video.playbackRate(n||o)}var i=[.02,.03,.06,.12,.25,.33,.5,.67,1,1.25,1.5,2,3,4,8,16,32,64],t=i.length;dom.ctrlSpeedSlider.change(function(){api.video.playbackRate(+this.value)}),dom.ctrlSpeedIcon.click(function(){api.video.playbackRate(1)}),api.keyboard.shortcut("minus",e.bind(null,-1)).shortcut("plus",e.bind(null,1))}(),dom.ctrlSubtitlesToggle.add(dom.ctrlSubtitlesIcon).click(api.subtitles.toggle),api.keyboard.shortcut("g",del("-=.05")).shortcut("h",del("+=.05")).shortcut("shift+g",del("-=.25")).shortcut("shift+h",del("+=.25")).shortcut("alt+g",del("-=1")).shortcut("alt+h",del("+=1")).shortcut("ctrl+g",del("-=5")).shortcut("ctrl+h",del("+=5")),function(){function e(e){e!==o&&n.toggleClass("loading",o=e)}function i(e){"video"===api.video.type&&(e?r.play():r.pause())}var t,n=dom.ctrlThumbnail,l=n.outerWidth()/2,o=!1,r=dom.ctrlThumbnailVideo[0],a=dom.ctrlCutesliderPosition,s=a.parent();r.muted=!0,dom.ctrlThumbnailVideo.on("timeupdate",function(){e(!1);var i=api.playlist.selectedFile();api.isLoaded&&"video"===i.type&&(i.isLocal||i.cors)&&!api.thumbnail.cache.getImage(~~r.currentTime)&&api.thumbnail.canvas.drawFromVideo()}),a.mouseenter(i.bind(null,!0)).mouseleave(i.bind(null,!1)).mousemove(function(i){if(!api.video.isStopped){var o=a.offset().left,u=i.pageX-o;if(u!==t){var c=a.width(),d=u/c*api.video.duration(),p=l-o;t=u,s.attr("data-tooltip-content",utils.secondsToString(d)),"video"===api.video.type&&(e(!0),r.paused&&r.play(),n.css("left",utils.range(p,u,c-p)),api.thumbnail.canvas.drawFromImg(api.thumbnail.cache.getImage(d,30)),r.currentTime=d)}}})}(),dom.screenVideo.add(dom.screenVideoDistant).on({loadedmetadata:function(){api.fileLoaded(),ui.loaded()},waiting:function(){ui.seeking()},seeked:function(){ui.seeked()},durationchange:function(){ui.duration(this.duration);
},timeupdate:function(){ui.seeked().currentTime(this.currentTime).buffered()},ended:function(){var e=api.playlist.selectedFile(),i=api.playlist.repeat();"loopAll"===i||i===!0&&e.element.jqThis.next().length?api.playlist.next():api.video.stop()}}),dom.ctrlVisualToggle.add(dom.ctrlVisualIcon).click(ui.visualizerToggle),function(){var e=api.audio.volume;dom.ctrlVolumeIcon.click(api.audio.muteToggle),dom.ctrlVolumeSlider.change(function(){e(this.value)}),api.keyboard.shortcut("ctrl+down",e.bind(null,"-=.05")).shortcut("ctrl+up",e.bind(null,"+=.05")),dom.screen.on("wheel",function(i){e(i.originalEvent.deltaY<0?"+=.05":"-=.05")})}();