"use strict";(self.webpackChunksocial_network=self.webpackChunksocial_network||[]).push([[537],{4537:function(e,n,r){r.r(n),r.d(n,{AddMessageForm:function(){return v},Chat:function(){return d},Messages:function(){return g},default:function(){return h}});var t=r(885),s=r(2791),a=r(6614),c=r(1893),u="chatPage_messageImg__s2YU6",i="chatPage_wrapper__-6Hp2",o="chatPage_container__0IygT",l="chatPage_messageItems__iP8wA",f=r(184),h=function(){return(0,f.jsx)(d,{})},d=function(){var e=(0,c.C)((function(e){return e.chat.status})),n=(0,c.T)();return(0,s.useEffect)((function(){return n((0,a.WE)()),function(){n((0,a.R7)())}}),[]),(0,f.jsxs)("section",{children:["error"===e&&(0,f.jsx)("div",{children:"Error.Please refresh the page"}),(0,f.jsx)(g,{}),(0,f.jsx)(v,{})]})},g=function(){var e=(0,c.C)((function(e){return e.chat.messages})),n=(0,s.useRef)(null),r=(0,s.useState)(!1),a=(0,t.Z)(r,2),u=a[0],o=a[1];return(0,s.useEffect)((function(){var e;null===(e=n.current)||void 0===e||e.scrollIntoView(!0)}),[e]),(0,f.jsxs)("div",{className:i,onScroll:function(e){var n=e.currentTarget;Math.abs(n.scrollHeight-n.scrollTop-n.clientHeight)<300?!u&&o(!0):u&&o(!1)},children:[e.map((function(e,n){return(0,f.jsx)(m,{message:e},e.id)})),(0,f.jsx)("div",{ref:n})]})},m=s.memo((function(e){var n=e.message;return(0,f.jsxs)("div",{className:o,children:[(0,f.jsxs)("div",{className:l,children:[(0,f.jsx)("img",{className:u,src:n.photo}),n.userName]}),(0,f.jsx)("span",{children:n.message})]})})),v=function(){var e=(0,s.useState)(""),n=(0,t.Z)(e,2),r=n[0],u=n[1],i=(0,c.T)(),o=(0,c.C)((function(e){return e.chat.status}));return(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{children:(0,f.jsx)("textarea",{onChange:function(e){return u(e.currentTarget.value)},value:r})}),(0,f.jsx)("button",{disabled:"ready"!==o,onClick:function(){r&&(i((0,a.bG)(r)),u(""))},children:"Send"})]})}}}]);
//# sourceMappingURL=537.8b513478.chunk.js.map