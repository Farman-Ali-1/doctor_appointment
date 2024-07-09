"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[727],{6727:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var o=n(4165),r=n(5861),i=n(9439),d=n(2791),l=n(3321),s=n(6794),a=n(59),c=n(4971),u=n(5318),p=n(3200),v=n(9434),h=n(456),m=n(3263),x=n(5218),j=n(184),f=function(){var e,t=(0,d.useState)([]),n=(0,i.Z)(t,2),f=n[0],Z=n[1],g=(0,v.I0)(),b=(0,v.v9)((function(e){return e.root})).loading,A=(0,h.Z)(localStorage.getItem("token")).userId,I=function(){var e=(0,r.Z)((0,o.Z)().mark((function e(t){var n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,g((0,u.K4)(!0)),e.next=4,(0,c.Z)("/appointment/getallappointments?search=".concat(A));case 4:n=e.sent,Z(n),g((0,u.K4)(!1)),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}();(0,d.useEffect)((function(){I()}),[]);var k=function(){var e=(0,r.Z)((0,o.Z)().mark((function e(t){var n,r,i;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.ZP.promise(m.Z.put("/appointment/completed",{appointid:null===t||void 0===t?void 0:t._id,doctorId:null===t||void 0===t||null===(n=t.doctorId)||void 0===n?void 0:n._id,doctorname:"".concat(null===t||void 0===t||null===(r=t.userId)||void 0===r?void 0:r.firstname," ").concat(null===t||void 0===t||null===(i=t.userId)||void 0===i?void 0:i.lastname)},{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}),{success:"Appointment Completed successfully",error:"Unable to Complete Appointment",loading:"Completing Appointment..."});case 3:I(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),e.t0.response&&400===e.t0.response.status?"Appointment has already been completed"===e.t0.response.data.error?x.ZP.error("Appointment Has Already Been Completed"):"No prescription found for this appointment"===e.t0.response.data.error&&x.ZP.error("No Prescription Found For This Appointment"):(console.error(e.t0),x.ZP.error("An error occurred. Please try again later."));case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}();return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(a.Z,{}),b?(0,j.jsx)(p.Z,{}):(0,j.jsxs)("section",{className:"container notif-section",children:[(0,j.jsx)("h2",{className:"page-heading",children:"Your Appointments"}),f.length>0?(0,j.jsx)("div",{className:"appointments",children:(0,j.jsxs)("table",{children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{children:"S.No"}),(0,j.jsx)("th",{children:"Doctor"}),(0,j.jsx)("th",{children:"Patient"}),(0,j.jsx)("th",{children:"Appointment Date"}),(0,j.jsx)("th",{children:"Appointment Time"}),(0,j.jsx)("th",{children:"Booking Date"}),(0,j.jsx)("th",{children:"Booking Time"}),(0,j.jsx)("th",{children:"Status"}),A===(null===(e=f[0].doctorId)||void 0===e?void 0:e._id)?(0,j.jsx)("th",{children:"Action"}):(0,j.jsx)(j.Fragment,{})]})}),(0,j.jsx)("tbody",{children:null===f||void 0===f?void 0:f.map((function(e,t){var n,o,r,i,d;return(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{children:t+1}),(0,j.jsx)("td",{children:(null===e||void 0===e||null===(n=e.doctorId)||void 0===n?void 0:n.firstname)+" "+(null===e||void 0===e||null===(o=e.doctorId)||void 0===o?void 0:o.lastname)}),(0,j.jsx)("td",{children:(null===e||void 0===e||null===(r=e.userId)||void 0===r?void 0:r.firstname)+" "+(null===e||void 0===e||null===(i=e.userId)||void 0===i?void 0:i.lastname)}),(0,j.jsx)("td",{children:null===e||void 0===e?void 0:e.date}),(0,j.jsx)("td",{children:null===e||void 0===e?void 0:e.time}),(0,j.jsx)("td",{children:null===e||void 0===e?void 0:e.createdAt.split("T")[0]}),(0,j.jsx)("td",{children:null===e||void 0===e?void 0:e.updatedAt.split("T")[1].split(".")[0]}),(0,j.jsx)("td",{children:null===e||void 0===e?void 0:e.status}),A===(null===e||void 0===e||null===(d=e.doctorId)||void 0===d?void 0:d._id)?(0,j.jsx)("td",{children:(0,j.jsx)("button",{className:"btn user-btn accept-btn ".concat("Completed"===(null===e||void 0===e?void 0:e.status)?"disable-btn":""),disabled:"Completed"===(null===e||void 0===e?void 0:e.status),onClick:function(){return k(e)},children:"Complete"})}):(0,j.jsx)(j.Fragment,{})]},null===e||void 0===e?void 0:e._id)}))})]})}):(0,j.jsx)(l.Z,{})]}),(0,j.jsx)(s.Z,{})]})}}}]);
//# sourceMappingURL=727.34e75e8d.chunk.js.map