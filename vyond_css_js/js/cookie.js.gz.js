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

function set_cookie(b,g,i,f,h,j,e,a){var d=b+"="+escape(g);if(i){var c=new Date(i,f,h);d+="; expires="+c.toGMTString()}if(j){d+="; path="+escape(j)}if(e){d+="; domain="+escape(e)}if(a){d+="; secure"}document.cookie=d}function delete_cookie(b){var a=new Date();a.setUTCFullYear(1970,0,1);a.setUTCHours(0,0,1);document.cookie=b+="=; expires="+a.toUTCString()}function get_cookie(b){var a=document.cookie.match("(^|;) ?"+b+"=([^;]*)(;|$)");if(a){return(unescape(a[2]))}else{return null}};

}
