// ------------------------------
//  Start of Strap API
// ------------------------------
var strap_api_num_samples=10;var strap_api_url="https://api.straphq.com/create/visit/with/";var strap_api_timer_send=null;var strap_api_const={};strap_api_const.KEY_OFFSET=48e3;strap_api_const.T_TIME_BASE=1e3;strap_api_const.T_TS=1;strap_api_const.T_X=2;strap_api_const.T_Y=3;strap_api_const.T_Z=4;strap_api_const.T_DID_VIBRATE=5;strap_api_const.T_ACTIVITY=2e3;strap_api_const.T_LOG=3e3;var strap_api_can_handle_msg=function(e){var t=strap_api_const;if((t.KEY_OFFSET+t.T_ACTIVITY).toString()in e){return true}if((t.KEY_OFFSET+t.T_LOG).toString()in e){return true}return false};var strap_api_clone=function(e){if(null==e||"object"!=typeof e)return e;var t={};for(var n in e){if(e.hasOwnProperty(n))t[n]=e[n]}return t};var strap_api_log=function(e,t,n){var r=strap_api_const;var i=n;if(!((r.KEY_OFFSET+r.T_LOG).toString()in e)){var s=strap_api_convAcclData(e);var o=window.localStorage["strap_accl"];if(o){o=JSON.parse(o)}else{o=[]}o=o.concat(s);if(o.length>t){window.localStorage.removeItem("strap_accl");var u=new XMLHttpRequest;u.open("POST",strap_api_url,true);var a=(new Date).getTimezoneOffset()/60*-1;var f="app_id="+i["app_id"]+"&resolution="+(i["resolution"]||"")+"&useragent="+(i["useragent"]||"")+"&action_url="+"STRAP_API_ACCL"+"&visitor_id="+(i["visitor_id"]||Pebble.getAccountToken())+"&visitor_timeoffset="+a+"&accl="+encodeURIComponent(JSON.stringify(o))+"&act="+(o.length>0?o[0].act:"UNKNOWN");u.setRequestHeader("Content-type","application/x-www-form-urlencoded");u.setRequestHeader("Content-length",f.length);u.setRequestHeader("Connection","close");u.onload=function(e){if(u.readyState==4&&u.status==200){if(u.status==200){}else{}}};u.send(f)}else{window.localStorage["strap_accl"]=JSON.stringify(o)}}else{var u=new XMLHttpRequest;u.open("POST",strap_api_url,true);var a=(new Date).getTimezoneOffset()/60*-1;var f="app_id="+i["app_id"]+"&resolution="+(i["resolution"]||"")+"&useragent="+(i["useragent"]||"")+"&action_url="+e[(r.KEY_OFFSET+r.T_LOG).toString()]+"&visitor_id="+(i["visitor_id"]||Pebble.getAccountToken())+"&visitor_timeoffset="+a;u.setRequestHeader("Content-type","application/x-www-form-urlencoded");u.setRequestHeader("Content-length",f.length);u.setRequestHeader("Connection","close");u.onload=function(e){if(u.readyState==4&&u.status==200){if(u.status==200){}else{}}};u.send(f)}};var strap_api_convAcclData=function(e){var t=strap_api_const;var n=[];var r=parseInt(e[(t.KEY_OFFSET+t.T_TIME_BASE).toString()]);for(var i=0;i<strap_api_num_samples;i++){var s=t.KEY_OFFSET+10*i;var o={};var u=(s+t.T_TS).toString();o.ts=e[u]+r;u=(s+t.T_X).toString();o.x=e[u];u=(s+t.T_Y).toString();o.y=e[u];u=(s+t.T_Z).toString();o.z=e[u];u=(s+t.T_DID_VIBRATE).toString();o.vib=e[u]=="1"?true:false;o.act=e[(t.KEY_OFFSET+t.T_ACTIVITY).toString()];n.push(o)}return n}

// ------------------------------
//  End of Strap API
// ------------------------------

Pebble.addEventListener("appmessage",
    function(e) {
        // Strap API: Developer updates these parameters to fit
        var strap_params = {
            // *** change the app id! *** //
            app_id: "5BJQ7wcF7gLfwoWjL",
            resolution: "144x168",
            useragent: "PEBBLE/2.0"
        };

        // -------------------------
        //  Strap API inclusion in appmessage
        //  This allows Strap to process Strap-related messages
        //  DO NOT EDIT
        // -------------------------
        if(strap_api_can_handle_msg(e.payload)) {
            clearTimeout(strap_api_timer_send);
            var params = strap_api_clone(strap_params);
            strap_api_log(e.payload, 200, params);
            strap_api_timer_send = setTimeout(function() {
                strap_api_log({}, 0, params);
            }, 10 * 1000);
        }
        // -------------------------

    }
);