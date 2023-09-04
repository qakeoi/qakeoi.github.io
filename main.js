function isIOS() {
    return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend"in document
}
function isAndroid() {
    var t = navigator.userAgent.toLowerCase();
    return t.indexOf("android") > -1
}
var $ = document.querySelector.bind(document)
  , $$ = document.querySelectorAll.bind(document);
const navbarBurger = $(".navbar-burger")
  , faqBtns = $$(".btn-accordion")
  , pasteBtn = $(".button-paste")
  , urlInput = $("#url")
  , alertEL = $(".message")
  , alertContent = $(".message-body")
  , form = document.forms.namedItem("formurl")
  , downloads = $("#download")
  , languageBtns = $$(".lang-item")
  , loader = $(".get-loader")
  , closeStickyBtn = $("#sticky-close")
  , adBoxs = $$(".ad-box")
  , app = {
    config: JSON.parse(localStorage.getItem(STORAGE_KEY)) || {},
    setConfig: function(t, e) {
        this.config[t] = e,
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config))
    },
    handleEvents: function() {
        const t = this;
        adBoxs.forEach(function(t) {
            const e = new MutationObserver(function(e, n) {
                t && (t.style.minHeight = "")
            }
            );
            e.observe(t, {
                attributes: !0,
                attributeFilter: ["style"]
            })
        }),
        form && form.addEventListener("submit", function(e) {
            if (gtag("event", "click_get_video", {
                value_input: urlInput.value
            }),
            t.validator()) {
                loader.classList.add("is-active");
                var n = new FormData(form)
                  , a = new XMLHttpRequest;
                a.open("POST", "/abc2.php", !0),
                a.onload = function(e) {
                    200 == a.status ? t.insertAndExecute("js-result", "<script type='text/javascript'>" + a.response + "</script>") : t.showAlert("Error " + a.status + " something went wrong.", "error_status" + a.status, urlInput.value)
                }
                ,
                a.send(n)
            }
            e.preventDefault()
        }, !1),
        languageBtns.forEach(function(e) {
            e.onclick = function(e) {
                t.setConfig("hl", this.dataset.hl)
            }
        }),
        navbarBurger.onclick = function(t) {
            navbarBurger.classList.toggle("is-active"),
            $("#snaptik-menu").classList.toggle("is-active")
        }
        ,
        faqBtns.forEach(t=>{
            t.addEventListener("click", ()=>{
                var e = t.nextElementSibling;
                if (t.classList.contains("active"))
                    t.classList.remove("active"),
                    e.style.maxHeight = null;
                else {
                    var n = $$(".btn-accordion.active");
                    n.forEach(t=>{
                        t.classList.remove("active"),
                        t.nextElementSibling.style.maxHeight = null
                    }
                    ),
                    t.classList.add("active"),
                    e.style.maxHeight = e.scrollHeight + "px"
                }
            }
            )
        }
        ),
        pasteBtn && pasteBtn.addEventListener("click", ()=>{
            pasteBtn.classList.contains("btn-clear") ? (urlInput.value = "",
            navigator.clipboard && (pasteBtn.classList.remove("btn-clear"),
            $(".button-paste span").innerText = jsLang.paste)) : navigator.clipboard && navigator.clipboard.readText().then(function(e) {
                "" != e ? (urlInput.value = e,
                t.showBtnClear()) : t.showAlert(jsLang.linkEmpty, "input_empty")
            })
        }
        ),
        navigator.clipboard || pasteBtn.remove(),
        urlInput && urlInput.addEventListener("keyup", function(e) {
            urlInput.value.length > 0 && t.showBtnClear(),
            t.hideAlert
        }),
        isAndroid() && ($(".button-install").style.display = "flex"),
        downloads && (downloads.onclick = function(e) {
            const n = e.target.closest(".download-file");
            if (n) {
                if ("true" === n.dataset.ad) {
                    var a = document.querySelectorAll('ins[data-vignette-loaded="true"]');
                    0 === a.length && (isIOS() && e.preventDefault(),
                    e.stopPropagation(),
                    t.openAdsModal(),
                    isIOS() && setTimeout(function() {
                        null != n.getAttribute("href") ? window.location.href = n.getAttribute("href") : gtag("event", "Error_Download_vignetteAds")
                    }, 1e3))
                }
                n.dataset.event && gtag("event", "click_download_file", {
                    server_name: n.dataset.event
                })
            }
            const o = e.target.closest(".btn-render");
            o && startRender(o.dataset.token);
            const r = e.target.closest(".btn-download-hd");
            if (r) {
                r.classList.add("downloading"),
                r.disabled = !0,
                (powerTag.Init = window.powerTag.Init || []).push(function() {
                    powerAPITag.getRewardedAd("pw_16256")
                });
                const e = r.dataset.tokenhd;
                fetch(`/getHdLink.php?token=${e}`).then(t=>t.json()).then(e=>{
                    e.error ? (r.classList.remove("downloading"),
                    r.disabled = !1,
                    t.showToast("Error while calling API, please try again.", "error_getHD")) : (hdDownloadInfo = {
                        ...hdDownloadInfo,
                        url: e.url
                    },
                    checkHdDownloadReady())
                }
                ).catch(e=>{
                    r.classList.remove("downloading"),
                    r.disabled = !1,
                    t.showToast("Error while calling API, please try again.", "error_getHD_response")
                }
                ),
                r.dataset.event && gtag("event", "click_download_file", {
                    quality: "HD_reward"
                })
            }
        }
        )
    },
    validator: function() {
        const t = urlInput.value
          , e = /https?:\/\/(?:[-\w]+\.)?[-\w]+(?:\.\w+)+\/?.*/
          , n = t.match(e);
        return "" === t ? (this.showAlert(jsLang.linkEmpty, "link_empty"),
        !1) : n ? !this.showPartnerLink(t) : (this.showAlert(jsLang.notUrl, "error_url", urlInput.value),
        !1)
    },
    showToast: function(t, e="") {
        Toastify({
            text: t,
            duration: 3e3,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast(),
        gtag("event", e)
    },
    showPartnerLink: function(t) {
        return -1 !== t.indexOf("instagram.com/") ? (this.showAlert(decodeURIComponent(jsLang.partnerIg), "input_url_instagram", urlInput.value),
        !0) : (-1 !== t.indexOf("facebook.com/") || -1 !== t.indexOf("fb.com/")) && (this.showAlert(decodeURIComponent(jsLang.partnerFb), "input_url_facebook", urlInput.value),
        !0)
    },
    openAdsModal: function() {
        $("#modal-vignette").classList.add("is-active"),
        $(".modal-content").innerHTML = '<div class="snapcdn-ad"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2496545456108734" data-ad-slot="5058619510" data-ad-format="auto" data-full-width-responsive="true"></ins></div>',
        (adsbygoogle = window.adsbygoogle || []).push({})
    },
    hideAlert: function() {
        alertEL.classList.remove("show"),
        alertContent.innerHTML = ""
    },
    showAlert: function(t, e=null, n=null) {
        loader.classList.remove("is-active"),
        alertEL.classList.add("show"),
        alertContent.innerHTML = t,
        setTimeout(function() {
            alertEL.classList.remove("show"),
            alertContent.innerHTML = ""
        }, 3e3),
        e && gtag("event", "get_video_failure", {
            error_code: e,
            value_input: n
        })
    },
    showBtnClear: function() {
        pasteBtn.classList.add("btn-clear"),
        $(".button-paste span").innerText = jsLang.clear
    },
    insertAndExecute: function(t, e) {
        domelement = document.getElementById(t),
        domelement.innerHTML = e;
        var n = [];
        ret = domelement.childNodes;
        for (var a = 0; ret[a]; a++)
            !n || !this.nodeName(ret[a], "script") || ret[a].type && "text/javascript" !== ret[a].type.toLowerCase() || n.push(ret[a].parentNode ? ret[a].parentNode.removeChild(ret[a]) : ret[a]);
        for (script in n)
            this.evalScript(n[script])
    },
    nodeName: function(t, e) {
        return t.nodeName && t.nodeName.toUpperCase() === e.toUpperCase()
    },
    evalScript: function(t) {
        data = t.text || t.textContent || t.innerHTML || "";
        var e = document.getElementsByTagName("head")[0] || document.documentElement
          , n = document.createElement("script");
        n.type = "text/javascript",
        n.appendChild(document.createTextNode(data)),
        e.insertBefore(n, e.firstChild),
        e.removeChild(n),
        t.parentNode && t.parentNode.removeChild(t)
    },
    start: function() {
        this.handleEvents()
    }
};
app.start(),
document.addEventListener("DOMContentLoaded", ()=>{
    function t(t) {
        t.classList.remove("is-active")
    }
    function e() {
        (document.querySelectorAll(".modal") || []).forEach(e=>{
            t(e)
        }
        )
    }
    (document.querySelectorAll(".modal-background, .modal-close") || []).forEach(e=>{
        const n = e.closest(".modal");
        e.addEventListener("click", ()=>{
            t(n)
        }
        )
    }
    ),
    document.addEventListener("keydown", t=>{
        const n = t || window.event;
        27 === n.keyCode && e()
    }
    )
}
);
