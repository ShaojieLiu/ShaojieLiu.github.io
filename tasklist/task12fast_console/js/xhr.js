var open = window.XMLHttpRequest.prototype.open,
    send = window.XMLHttpRequest.prototype.send,
    ReadyStateChange,
    xhrArray = []

    function openReplacement(method, url, async, user, password) {
        this.time0 = new Date().getTime()
        // console.owarn(`XHR req{method: ${method}, url: ${url}}`);
        document.querySelector('.window-network-display').insertAdjacentHTML('beforeend', `
        <li class="window-network-display-xhr" id=${url}>XHR request{method: ${method}, url: ${url}}</li>`)
        let xhrObj = {url: url, method: method, status:'', response:'', data:'', time:''}
        xhrArray.push(xhrObj)
        // console.log(xhrArray)
        open.apply(this, arguments);
    }
    function sendReplacement(data) {
      let ajaxReadyStateChange,
            ajaxLoad;
        // console.owarn('Sending HTTP request data : ', data);

        // onreadystatechange replacement
        if (this.onreadystatechange) {
            ReadyStateChange = this.onreadystatechange;
        }
        this.onreadystatechange = function () {
            // console.owarn('HTTP request ready state changed : ' + this.readyState);
            ajaxReadyStateChange = new CustomEvent('ajaxReadyStateChange', { detail: this });
            window.dispatchEvent(ajaxReadyStateChange);

            if(ReadyStateChange) {
                ReadyStateChange.apply(this, arguments);
            }

            // onload
            if (this.readyState === 4) {
              let xhrObj = {method: this.method, url: this.responseURL, status:'', response:'', data:'', time:''}

                // console.owarn(`XHR res{status: ${this.status}, url: ${this.responseURL.split('/')[3]}, response: ${this.response}}`)
                let color = 'green'
                if (this.status >= 400) {
                  color = 'error'
                  document.querySelector('.window-console-display').insertAdjacentHTML('beforeend', `
                    <li class="window-console-display-error">
                      [xhr]~url: ${this.responseURL.split('/')[3]} <br>
                      status: ${this.status} <br>
                      response: <br>
                      <p>
                      ${encodeURI(this.response)}
                      </p>
                    </li>`)
                }
                // console.owarn(this)
                document.querySelector('.window-network-display').insertAdjacentHTML('beforeend', `
                <li class="window-network-display-xhr ${color}">
                  XHR response <br>
                  status: ${this.status} <br>
                  url: ${this.responseURL.split('/')[3]} <br>
                  response: <br>
                  <p>
                  ${encodeURI(this.response)}}
                  </p>
                </li>`)
                let time1 = new Date().getTime(),
                    time = time1 - this.time0
                // console.oinfo(time, color)
                ajaxLoad = new CustomEvent('ajaxLoad', { detail: this });
                dispatchEvent(ajaxLoad);
            }
        };

        send.apply(this, arguments);
    }
    window.XMLHttpRequest.prototype.open = openReplacement
    window.XMLHttpRequest.prototype.send = sendReplacement

    document.querySelector('.clear').addEventListener('click', function() {
      document.querySelectorAll('.window-network-display-xhr').forEach((elt)=>{elt.remove()})
    })
