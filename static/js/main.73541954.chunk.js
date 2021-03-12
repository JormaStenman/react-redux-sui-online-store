(this["webpackJsonpreact-redux-sui-online-store"]=this["webpackJsonpreact-redux-sui-online-store"]||[]).push([[0],{182:function(e){e.exports=JSON.parse('[{"id":12587,"name":"Oranges from the sunny Naples. Price is per kilo.","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi scelerisque eu ultrices vitae auctor. Tellus cras adipiscing enim eu turpis egestas pretium. Amet dictum sit amet justo donec enim.","price":1.99,"inventory":100},{"id":16241,"name":"A plate of fruit with orange, strawberry, apple, and grapes.","details":"Dignissim suspendisse in est ante in nibh mauris. Integer quis auctor elit sed vulputate mi sit. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Vitae auctor eu augue ut lectus arcu bibendum. Nisi lacus sed viverra tellus in.","price":8.99,"inventory":15},{"id":16328,"name":"A cluster of five to six tomatoes weighing around 400g.","details":"Ipsum dolor sit amet consectetur adipiscing. Velit aliquet sagittis id consectetur purus. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Arcu ac tortor dignissim convallis aenean et tortor at. Semper auctor neque vitae tempus quam pellentesque.","price":2.99,"inventory":50},{"id":24805,"name":"A fruit salad with sliced strawberries, cantaloupe melon, kiwi fruit, pineapple, and grapes.","details":"Maecenas pharetra convallis posuere morbi leo urna molestie at. Rhoncus urna neque viverra justo nec ultrices dui. Facilisi nullam vehicula ipsum a. Pretium lectus quam id leo in. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Sed risus ultricies tristique nulla.","price":9.99,"inventory":10},{"id":24806,"name":"A bowl of fruit with honey melon, blueberry, and blackberry.","details":"Mi quis hendrerit dolor magna. Ornare massa eget egestas purus viverra accumsan in. Platea dictumst quisque sagittis purus sit amet volutpat consequat. Consectetur adipiscing elit pellentesque habitant. Quisque sagittis purus sit amet volutpat consequat mauris nunc.","price":7.99,"inventory":20},{"id":93779,"name":"Strawberries! Picked fresh every day. Price per litre.","details":"Rhoncus urna neque viverra justo nec ultrices dui sapien. Odio aenean sed adipiscing diam donec adipiscing tristique. Nisl pretium fusce id velit. At tempor commodo ullamcorper a lacus vestibulum sed.","price":4.99,"inventory":30}]')},199:function(e,t,r){},200:function(e,t,r){},299:function(e,t,r){"use strict";r.r(t);r(194);var n=r(0),c=r(40),a=r.n(c),i=(r(199),r(200),r(316)),s=r(320),o=r(42),l=r(88),d=r(13),u=r(15),j=r(8),b=r(20),h=Object(b.d)({name:"cart",initialState:{},reducers:{addToCart:function(e,t){var r=t.payload;e[r]|=0,e[r]++},setQuantity:function(e,t){var r=t.payload,n=r.productId,c=r.newQuantity;e[n]=c,e[n]<=0&&delete e[n]},emptyCart:function(e){return{}}}}),p=h.actions,O=p.addToCart,m=p.emptyCart,f=p.setQuantity,x=function(e){return e[h.name]},g=h.reducer,v=r(1),w=function(){var e=Object(j.c)((function(e){return function(e){return Object.keys(x(e)).length}(e)}));return Object(v.jsx)(i.a,{children:Object(v.jsxs)(s.a,{stackable:!0,borderless:!0,children:[Object(v.jsx)(y,{path:"/main",children:"Main"}),Object(v.jsx)(y,{path:"/products",children:"Products"}),Object(v.jsxs)(s.a.Menu,{position:"right",children:[Object(v.jsx)(y,{path:"/orders",children:"My Orders"}),Object(v.jsxs)(y,{path:"/cart",children:[Object(v.jsx)(o.a,{name:"shopping cart"}),"Shopping cart",e?Object(v.jsx)(l.a,{circular:!0,children:e}):null]})]})]})})};function y(e){var t=e.path,r=e.children,n=Object(d.h)();return Object(v.jsx)(s.a.Item,{active:n.pathname===t,as:u.b,to:t,replace:!0,children:r})}var C=r(41),I=r(300),k=r(330),S=r(319),A=r(331),T=r(322),q=r(21),P=r.n(q),R=r(44),B=r(56),E=r(182),F=r(139),N=r(328),M=window.localStorage,H="me.stenman.orders",D="me.stenman.products",W=function(){return V({resultFunc:function(){M.removeItem(H)}})},G=function(){return V({resultFunc:function(){M.removeItem(D)}})},J=function(e){return V({resultFunc:function(){var t=Object(N.a)(),r=Object(B.a)(Object(B.a)({},e),{},{id:t,date:(new Date).toISOString().substr(0,10),createdAt:Date.now()}),n=_();return n[t]=r,$(n),{order:r}}})},Y=function(e){return V({resultFunc:function(){var t=_();return delete t[e],$(t),{deleted:e}}})},L=function(){return V({resultFunc:function(){return{orders:Object.values(_())}}})},z=function(){return V({resultFunc:function(){return{products:Object.values(K())}}})},Q=function(e){return V({resultFunc:function(){var t=K();if(e in t)return{product:t[e]};throw new Error("no product found matching id ".concat(e))}})},U=function(e){return V({resultFunc:function(){var t=K();if(e.id in t)return t[e.id]=Object(B.a)(Object(B.a)({},t[e.id]),e),X(t),{updated:t[e.id]};throw new Error("No product found with id ".concat(e.id,"."))}})};function V(e){var t=e.resultFunc,r=void 0===t?function(){}:t,n=e.maxDelay,c=void 0===n?5e3:n,a=e.errorProb,i=void 0===a?0:a;return new Promise((function(e,t){setTimeout((function(){var n=function(e){return Object(F.random)(1,!0)<=e?"A fake API error occurred. Error probability\n        ".concat((100*e).toFixed(),"% is adjustable in client.js."):null}(i);if(n)t(new Error(n));else{var c;try{c=r()}catch(a){t(a)}e(c)}}),Object(F.random)(c))}))}function _(){return JSON.parse(M.getItem(H)||"{}")}function $(e){M.setItem(H,JSON.stringify(e))}function K(){var e=M.getItem(D);return e?JSON.parse(e):function(){var e=E.reduce((function(e,t){return e[t.id]=t,e}),{});return X(e),e}()}function X(e){M.setItem(D,JSON.stringify(e))}var Z="ordered",ee="waitingForProducts";function te(e){switch(e){case Z:return"ordered";case ee:return"waiting for products";default:return""}}var re=Object(b.c)({sortComparer:function(e,t){return t.createdAt-e.createdAt}}),ne="orders",ce=function(e){return e.orders},ae=re.getSelectors((function(e){return ce(e)})),ie=Object(b.b)("orders/fetchAllOrders",function(){var e=Object(R.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",L());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),{condition:function(e,t){var r=t.getState,n=ce(r());return 0===re.getSelectors().selectTotal(n)&&!n.loading}}),se=Object(b.b)("orders/createOrder",function(){var e=Object(R.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",J(t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),oe=Object(b.b)("orders/cancelOrder",function(){var e=Object(R.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Y(t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),le=Object(b.b)("orders/clearOrders",Object(R.a)(P.a.mark((function e(){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",W());case 1:case"end":return e.stop()}}),e)})))),de=Object(b.d)({name:ne,initialState:re.getInitialState({loading:!1,error:null,latestOrder:null}),reducers:{},extraReducers:function(e){e.addCase(ie.fulfilled,(function(e,t){re.setAll(e,t.payload.orders)})).addCase(ie.rejected,(function(e){re.removeAll(e)})).addCase(se.pending,(function(e){e.latestOrder=null})).addCase(se.fulfilled,(function(e,t){e.latestOrder=t.payload.order,re.addOne(e,t.payload.order)})).addCase(oe.fulfilled,(function(e,t){re.removeOne(e,t.payload.deleted)})).addCase(le.fulfilled,(function(e){re.removeAll(e)})).addMatcher((function(e){return e.type.endsWith("/pending")}),(function(e){e.loading=!0,e.error=null})).addMatcher((function(e){return e.type.endsWith("/fulfilled")}),(function(e){e.loading=!1,e.error=null})).addMatcher((function(e){return e.type.endsWith("/rejected")}),(function(e,t){e.loading=!1,e.error=t.error.message}))}}),ue=de.reducer,je=Object(b.c)({sortComparer:function(e,t){return e.name.localeCompare(t.name)}}),be="products",he=function(e){return e.products},pe=je.getSelectors((function(e){return he(e)})),Oe=Object(b.b)("products/fetchAllProducts",function(){var e=Object(R.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),{condition:function(e,t){var r=t.getState,n=he(r());return 0===je.getSelectors().selectTotal(n)&&!n.loading}}),me=Object(b.b)("products/modifyInventory",function(){var e=Object(R.a)(P.a.mark((function e(t){var r,n,c,a,i,s;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.productId,n=t.quantity,e.next=3,Q(r);case 3:return c=e.sent,a=c.product,i=a.id,s=a.inventory,s+=n,e.abrupt("return",U({id:i,inventory:s}));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),fe=Object(b.b)("products/clearProducts",Object(R.a)(P.a.mark((function e(){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",G());case 1:case"end":return e.stop()}}),e)})))),xe=Object(b.d)({name:be,initialState:je.getInitialState({loading:!1,error:null}),reducers:{},extraReducers:function(e){e.addCase(Oe.fulfilled,(function(e,t){je.setAll(e,t.payload.products)})).addCase(Oe.rejected,(function(e){je.removeAll(e)})).addCase(me.fulfilled,(function(e,t){je.upsertOne(e,t.payload.updated)})).addCase(fe.fulfilled,(function(e){je.removeAll(e)})).addMatcher((function(e){return e.type.endsWith("/pending")}),(function(e){e.loading=!0,e.error=null})).addMatcher((function(e){return e.type.endsWith("/fulfilled")}),(function(e){e.loading=!1,e.error=null})).addMatcher((function(e){return e.type.endsWith("/rejected")}),(function(e,t){e.loading=!1,e.error=t.error.message}))}}),ge=xe.reducer;function ve(){var e=Object(j.b)(),t=Object(j.c)((function(e){return pe.selectTotal(e)})),r=Object(j.c)((function(e){return ae.selectTotal(e)})),c=Object(n.useState)(!0),a=Object(C.a)(c,2),i=a[0],s=a[1],o=Object(n.useState)(!1),l=Object(C.a)(o,2),d=l[0],u=l[1];Object(n.useEffect)((function(){!function(){var e=null!==M.getItem(H)||null!==M.getItem(D);console.log(Date.now(),"MainContent: dataInStorage",e),e||(console.log(Date.now(),"MainContent: setClearButtonLoading(false)"),u(!1)),console.log(Date.now(),"MainContent: toggleClearButtonDisabled(".concat(!e,")")),s(!e)}()}),[r,t]);var b=Object(v.jsx)(I.a.Group,{children:Object(v.jsx)(I.a,{negative:!0,icon:"trash alternate",content:"Clear local storage area",onClick:function(){return console.log(Date.now(),"handleClear: setClearButtonLoading(true)"),u(!0),console.log(Date.now(),"handleClear: toggleClearButtonDisabled(true)"),s(!0),e(le()),void e(fe())},disabled:i,loading:d})}),h=i?Object(v.jsxs)(k.a,{basic:!0,compact:!0,children:[Object(v.jsx)("p",{children:"No data in this application's local storage area."}),Object(v.jsx)("p",{children:"An easy way to load some is to visit the Products page."})]}):Object(v.jsx)(k.a,{basic:!0,compact:!0,children:Object(v.jsx)("p",{children:"Click to remove this application's data from the local storage area."})});return Object(v.jsx)(S.a,{content:h,trigger:b,on:["hover","click"],position:"bottom left"})}var we=function(){return Object(v.jsxs)(i.a,{style:{marginTop:"2em"},children:[Object(v.jsx)(ve,{}),Object(v.jsx)(A.a,{as:"h2",dividing:!0,children:"Demo Online Store"}),Object(v.jsx)("p",{children:"This web application demonstrates the following features usually found in any online store website:"}),Object(v.jsxs)(T.a,{bulleted:!0,relaxed:!0,style:{marginTop:"2em",marginBottom:"2em"},children:[Object(v.jsx)(T.a.Item,{children:"A list of products can be browsed."}),Object(v.jsx)(T.a.Item,{children:"The details of any product can be viewed."}),Object(v.jsx)(T.a.Item,{children:"Products can be added into a shopping cart."}),Object(v.jsx)(T.a.Item,{children:"The contents of the shopping cart can be manipulated before ordering."}),Object(v.jsx)(T.a.Item,{children:"The list of orders can be viewed."}),Object(v.jsx)(T.a.Item,{children:"The details of any order can be viewed."}),Object(v.jsx)(T.a.Item,{children:"An order can be cancelled."}),Object(v.jsx)(T.a.Item,{children:"Product inventories change when orders are placed or cancelled."}),Object(v.jsx)(T.a.Item,{children:"A navigation bar is always visible at the top of the page."})]}),Object(v.jsx)(A.a,{as:"h2",dividing:!0,children:"Implementation aspects"}),Object(v.jsx)("p",{children:"A few implementation details worth mentioning:"}),Object(v.jsxs)(T.a,{bulleted:!0,relaxed:!0,style:{marginTop:"2em",marginBottom:"2em"},children:[Object(v.jsxs)(T.a.Item,{children:["This application is an implementation of ",Object(v.jsx)("a",{href:"https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Simple-Online-Store.md",children:"this app-idea"}),"."]}),Object(v.jsxs)(T.a.Item,{children:["The application is a ",Object(v.jsx)("a",{href:"https://en.wikipedia.org/wiki/Single-page_application",children:"Single Page Application"})," working entirely inside the browser."]}),Object(v.jsxs)(T.a.Item,{children:["The application currently has no database integration. Instead, it stores all product and order data in ",Object(v.jsx)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",children:"the local storage area"})," of the user's browser. There's a button to explicitly clear this application's local storage area at the top of this page."]}),Object(v.jsxs)(T.a.Item,{children:["A client library, which simulates asynchronous client-server communication using ",Object(v.jsx)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",children:"Promises"}),", is used between the app state and the actual storage area."]})]}),Object(v.jsx)(A.a,{as:"h2",dividing:!0,children:"Implementation techniques"}),Object(v.jsx)("p",{children:"The application utilizes the following techniques and libraries:"}),Object(v.jsxs)(T.a,{bulleted:!0,relaxed:!0,style:{marginTop:"2em",marginBottom:"2em"},children:[Object(v.jsxs)(T.a.Item,{children:["All code is ",Object(v.jsx)("a",{href:"https://www.w3schools.com/Js/js_2018.asp",children:"ECMAScript 2018"}),"."]}),Object(v.jsxs)(T.a.Item,{children:["The initial project structure was created using ",Object(v.jsx)("a",{href:"https://create-react-app.dev",children:"Create React App"})," with ",Object(v.jsx)("a",{href:"https://www.npmjs.com/package/cra-template-redux",children:"the Redux template"}),"."]}),Object(v.jsxs)(T.a.Item,{children:["All components are ",Object(v.jsx)("a",{href:"https://reactjs.org/docs/components-and-props.html",children:"React Function Components"}),"."]}),Object(v.jsxs)(T.a.Item,{children:["Application state is managed using ",Object(v.jsx)("a",{href:"https://reactjs.org/docs/hooks-intro.html",children:"React Hooks"})," and ",Object(v.jsx)("a",{href:"https://redux-toolkit.js.org",children:"Redux Toolkit"}),"."]}),Object(v.jsxs)(T.a.Item,{children:["Navigation within the application is managed by ",Object(v.jsx)("a",{href:"https://reactrouter.com",children:"React Router"}),"."]}),Object(v.jsxs)(T.a.Item,{children:["UI components come from ",Object(v.jsx)("a",{href:"https://react.semantic-ui.com",children:"Semantic UI React"})]}),Object(v.jsxs)(T.a.Item,{children:["Some utility functions from ",Object(v.jsx)("a",{href:"https://lodash.com",children:"Lodash"})," are used."]})]}),Object(v.jsx)(A.a,{as:"h2",dividing:!0,children:"What next?"}),Object(v.jsx)("p",{children:"The app is pretty basic in its current state. Here are some ideas of what to add next:"}),Object(v.jsxs)(T.a,{bulleted:!0,relaxed:!0,style:{marginTop:"2em",marginBottom:"2em"},children:[Object(v.jsxs)(T.a.Item,{children:["As the main purpose of developing this app was to explore ",Object(v.jsx)("a",{href:"https://reactjs.org",children:"React"})," and related technologies, and time was limited, unit tests were omitted."]}),Object(v.jsx)(T.a.Item,{children:"There's no login/logout functionality for users."}),Object(v.jsx)(T.a.Item,{children:"Could use a real database with a backend service."}),Object(v.jsx)(T.a.Item,{children:"The app only speaks English. It could do with some l10n love."}),Object(v.jsx)(T.a.Item,{children:"Neither the products nor the orders listings are paged."})]}),Object(v.jsx)(A.a,{as:"h2",dividing:!0,children:"Image credits"}),Object(v.jsxs)("p",{children:["The images used in this app were downloaded from ",Object(v.jsx)("a",{href:"https://creativecommons.org",children:"the Creative Commons website"}),". Here are the credits to their creators:"]}),Object(v.jsxs)(T.a,{bulleted:!0,relaxed:!0,style:{marginTop:"2em",marginBottom:"2em"},children:[Object(v.jsxs)(T.a.Item,{children:['"Fruit salad" by lisaclarke is licensed with CC BY-ND 2.0. To view a copy of this license, visit \xa0',Object(v.jsx)("a",{href:"https://creativecommons.org/licenses/by-nd/2.0/",children:"https://creativecommons.org/licenses/by-nd/2.0/"})]}),Object(v.jsxs)(T.a.Item,{children:['"Fruit Veggie Art" by NicoleMariePhotoworks is licensed with CC BY 2.0. To view a copy of this license, visit ',Object(v.jsx)("a",{href:"https://creativecommons.org/licenses/by/2.0/",children:"https://creativecommons.org/licenses/by/2.0/"})]}),Object(v.jsx)(T.a.Item,{children:'"Fruit for a crisp" by lisaclarke is licensed under CC BY-ND 2.0'}),Object(v.jsx)(T.a.Item,{children:'"Fruits on a plate (testing iPhone 6+)" by Sergey Galyonkin is licensed under CC BY-SA 2.0'}),Object(v.jsx)(T.a.Item,{children:'"#napoli #market #antignano #frutta #fruits #clementine" by Antonio Manfredonio is licensed under CC BY-SA 2.0'}),Object(v.jsx)(T.a.Item,{children:'"strawberries" by seelensturm is licensed under CC BY 2.0'}),Object(v.jsx)(T.a.Item,{children:'"File:Grapes Emoji.png" by EmmanuelCordoliani is licensed under CC BY-SA 4.0'})]})]})},ye=r(325),Ce=r(332),Ie=r(184),ke=r(323),Se=r(326);function Ae(e){return"".concat("/react-redux-sui-online-store","/product_pics/").concat(e,".jpeg")}var Te=new Intl.NumberFormat("fi-FI",{style:"currency",currency:"EUR"}),qe=function(e){var t=e.render,r=e.modalOpen,c=e.setModalOpen,a=e.timeout;return Object(n.useEffect)((function(){var e=null;return a&&(e=setTimeout((function(){return c(!1)}),a)),function(){return e&&clearTimeout(e)}})),Object(v.jsx)(ke.a,{closeIcon:!0,onClose:function(){return c(!1)},open:r,children:t()})},Pe=r(317);function Re(e){var t=e.what;return Object(v.jsx)(Pe.a,{active:!0,content:"Loading ".concat(t,"...")})}function Be(){var e=Object(d.i)(),t=Object(j.c)((function(t){return pe.selectById(t,e.params.productId)})),r=Object(j.c)((function(e){return he(e).loading})),c=Object(j.c)((function(e){return he(e).error})),a=Object(j.b)(),s=Object(n.useState)(!1),o=Object(C.a)(s,2),l=o[0],b=o[1];return Object(n.useEffect)((function(){a(Oe())}),[a]),t?Object(v.jsxs)(i.a,{children:[Object(v.jsx)(ye.a,{centered:!0,fluid:!0,children:Object(v.jsxs)(Ce.a,{stackable:!0,container:!0,children:[Object(v.jsx)(Ce.a.Row,{children:Object(v.jsx)(Ce.a.Column,{children:Object(v.jsxs)(ye.a.Header,{children:[Object(v.jsx)("span",{className:"meta",children:t.id}),Object(v.jsx)("span",{children:"\xa0"}),Object(v.jsx)("span",{children:t.name})]})})}),Object(v.jsxs)(Ce.a.Row,{children:[Object(v.jsx)(Ce.a.Column,{width:"3",children:Object(v.jsx)(Ie.a,{size:"small",inline:!0,src:Ae(t.id)})}),Object(v.jsxs)(Ce.a.Column,{width:"13",textAlign:"justified",children:[Object(v.jsxs)(ye.a.Content,{children:[Object(v.jsx)(ye.a.Meta,{children:Object(v.jsx)("span",{className:"price",children:Te.format(t.price||0)})}),Object(v.jsx)(ye.a.Description,{children:t.details})]}),Object(v.jsx)(ye.a.Content,{extra:!0,children:Object(v.jsx)(ye.a.Meta,{children:Object(v.jsxs)("span",{children:["In stock: ",t.inventory]})})})]})]}),Object(v.jsx)(Ce.a.Row,{children:Object(v.jsx)(Ce.a.Column,{children:Object(v.jsxs)(I.a.Group,{children:[Object(v.jsx)(I.a,{icon:"arrow alternate circle left outline",content:"See more products",as:u.b,to:"/products"}),Object(v.jsx)(I.a,{primary:!0,icon:"add to cart",content:"Add to cart",onClick:function(){return t=e.params.productId,a(O(t)),void b(!0);var t}})]})})})]})}),Object(v.jsx)(qe,{modalOpen:l,setModalOpen:b,timeout:5e3,render:function(){return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)(ke.a.Header,{children:["One of ",Object(v.jsx)("i",{children:t.name})," added in ",Object(v.jsx)(u.b,{to:"/cart",replace:!0,children:"cart"}),"."]}),Object(v.jsx)(ke.a.Content,{children:Object(v.jsx)(Ie.a,{size:"tiny",inline:!0,src:Ae(t.id)})})]})}})]}):r?Object(v.jsx)(Re,{what:"product"}):c?Object(v.jsx)(Se.a,{error:!0,content:c}):null}var Ee=r(321),Fe=r(109),Ne=function(){var e=Object(j.b)(),t=Object(j.c)((function(e){return pe.selectAll(e)})),r=Object(j.c)((function(e){return he(e).loading})),c=Object(j.c)((function(e){return he(e).error}));return Object(n.useEffect)((function(){e(Oe())}),[e]),t&&t.length?Object(v.jsx)(Ee.a.Group,{divided:!0,children:t.map((function(e){return Object(v.jsxs)(Ee.a,{as:u.b,to:function(t){return r=t,n=e.id,Object(B.a)(Object(B.a)({},r),{},{pathname:"".concat(r.pathname,"/").concat(n)});var r,n},children:[Object(v.jsx)(Ee.a.Image,{size:"tiny",src:Ae(e.id)}),Object(v.jsxs)(Ee.a.Content,{children:[Object(v.jsx)(Ee.a.Header,{children:e.name}),Object(v.jsx)(Ee.a.Meta,{children:Object(v.jsx)("span",{className:"price",children:Te.format(e.price||0)})}),Object(v.jsx)(Ee.a.Description,{children:Object(Fe.truncate)(e.details,{length:200})}),Object(v.jsx)(Ee.a.Extra,{children:Object(v.jsx)(I.a,{children:"Select"})})]})]},e.id)}))}):r?Object(v.jsx)(Re,{what:"products"}):c?Object(v.jsx)(Se.a,{error:!0,content:c}):null},Me=r(324),He=r(318);function De(e){var t=e.productId,r=Object(j.c)((function(e){return pe.selectById(e,parseInt(t))})),n=Object(j.c)((function(e){return x(e)[r.id]})),c=Object(j.b)();function a(e){var t=parseInt(e.target.value);c(f({productId:r.id,newQuantity:t}))}return r?Object(v.jsxs)(Me.a.Row,{children:[Object(v.jsx)(Me.a.Cell,{children:Object(v.jsx)(u.b,{to:"/products/".concat(r.id),children:r.id})}),Object(v.jsx)(Me.a.Cell,{children:r.name}),Object(v.jsx)(Me.a.Cell,{children:Te.format(r.price||0)}),Object(v.jsx)(Me.a.Cell,{children:Object(v.jsx)(He.a,{fluid:!0,label:Object(v.jsx)(I.a,{icon:"remove",onClick:function(){return a({target:{value:0}})},title:"remove"}),type:"number",min:1,max:r.inventory,defaultValue:n,onChange:a})})]}):null}function We(){var e=Object(j.c)((function(e){return x(e)})),t=Object(j.c)((function(e){return pe.selectEntities(e)})),r=Object.keys(e).reduce((function(r,n){return r+e[n]*t[parseInt(n)].price}),0);return Object(v.jsxs)("span",{children:["Cart total:\xa0",Object(v.jsx)("strong",{children:Te.format(r)})]})}var Ge=function(){var e=Object(j.c)((function(e){return x(e)})),t=Object(j.b)(),r=Object(j.c)((function(e){return pe.selectEntities(e)})),c=Object(n.useState)(!1),a=Object(C.a)(c,2),i=a[0],s=a[1],o=Object(j.c)((function(e){return function(e){return ce(e).latestOrder}(e)}));return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)(Me.a,{striped:!0,children:[Object(v.jsx)(Me.a.Header,{children:Object(v.jsxs)(Me.a.Row,{children:[Object(v.jsx)(Me.a.HeaderCell,{width:"1",children:"ID"}),Object(v.jsx)(Me.a.HeaderCell,{width:"10",children:"Name"}),Object(v.jsx)(Me.a.HeaderCell,{width:"3",children:"Unit Price"}),Object(v.jsx)(Me.a.HeaderCell,{width:"2",children:"Quantity"})]})}),Object(v.jsx)(Me.a.Body,{children:Object.keys(e).map((function(e){return Object(v.jsx)(De,{productId:e},e)}))}),Object(v.jsx)(Me.a.Footer,{children:Object(v.jsx)(Me.a.Row,{children:Object(v.jsx)(Me.a.HeaderCell,{colSpan:"4",children:Object(v.jsx)(We,{})})})})]}),Object(v.jsxs)(I.a.Group,{children:[Object(v.jsx)(I.a,{as:u.b,content:"See more products",icon:"arrow alternate circle left outline",to:"/products"}),Object(v.jsx)(I.a,{content:"Cancel order",disabled:0===Object.keys(e).length,icon:"trash alternate",negative:!0,onClick:function(){return t(m())}}),Object(v.jsx)(I.a,{content:"Place order",disabled:0===Object.keys(e).length,icon:"share square",onClick:function(){t(se(Object.keys(e).reduce((function(n,c){var a=r[parseInt(c)],i=e[c],s=a.inventory-i;return n.products[c]||(n.products[c]={unitPrice:a.price,quantity:i}),n.status!==ee&&(n.status=s<0?ee:Z),t(me({productId:a.id,quantity:-i})),n}),{products:{}}))),t(m()),s(!0)},primary:!0})]}),o?Object(v.jsx)(qe,{modalOpen:i,setModalOpen:s,render:function(){return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(ke.a.Header,{children:"Thank you for your order!"}),Object(v.jsx)(ke.a.Content,{children:Object(v.jsxs)(k.a.Group,{children:[Object(v.jsx)(k.a.Inline,{children:Object(v.jsx)(u.b,{to:"/orders/".concat(o.id),replace:!0,children:"View this order."})}),Object(v.jsxs)(k.a.Inline,{children:["You can view all your orders on the ",Object(v.jsx)(u.b,{to:"/orders",replace:!0,children:"Orders page"})]})]})})]})}}):i?Object(v.jsx)(Re,{what:"order"}):null]})},Je=r(327);function Ye(e){var t=e.order,r=Object(d.h)(),c=Object(j.b)(),a=Object(j.c)((function(e){return pe.selectEntities(e)})),i=Object(j.c)((function(e){return he(e).loading})),s=Object(j.c)((function(e){return he(e).error}));Object(n.useEffect)((function(){c(Oe())}),[c]);var o="".concat(r.pathname,"/").concat(t.id);return Object(v.jsxs)(Me.a.Row,{children:[Object(v.jsx)(Me.a.Cell,{children:t.date}),Object(v.jsx)(Me.a.Cell,{children:te(t.status)}),Object(v.jsx)(Me.a.Cell,{children:Object(v.jsx)(u.b,{to:o,children:t.id})}),Object(v.jsx)(Me.a.Cell,{children:i?Object(v.jsxs)(Je.a,{fluid:!0,children:[Object(v.jsx)(Je.a.Line,{}),Object(v.jsx)(Je.a.Line,{})]}):s?Object(v.jsx)(Se.a,{error:!0,content:s}):Object.keys(t.products).map((function(e){var t=a[parseInt(e)];return t?Object(Fe.truncate)(t.name,{length:20}):""})).join(", ")})]})}var Le=function(){var e=Object(j.b)(),t=Object(j.c)((function(e){return ae.selectAll(e)})),r=Object(j.c)((function(e){return ce(e).loading})),c=Object(j.c)((function(e){return ce(e).error}));return Object(n.useEffect)((function(){e(ie())}),[e]),r?Object(v.jsx)(Re,{what:"orders"}):c?Object(v.jsx)(Se.a,{error:!0,content:c}):t?0===t.length?Object(v.jsx)(Se.a,{success:!0,children:"You have no orders."}):Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)(Me.a,{striped:!0,children:[Object(v.jsx)(Me.a.Header,{children:Object(v.jsxs)(Me.a.Row,{children:[Object(v.jsx)(Me.a.HeaderCell,{width:2,children:"Date"}),Object(v.jsx)(Me.a.HeaderCell,{width:3,children:"Status"}),Object(v.jsx)(Me.a.HeaderCell,{width:5,children:"ID"}),Object(v.jsx)(Me.a.HeaderCell,{width:6,children:"Contents"})]})}),Object(v.jsx)(Me.a.Body,{children:t.map((function(e){return Object(v.jsx)(Ye,{order:e},e.id)}))})]})}):null};function ze(e){var t=e.order,r=e.productId,c=Object(j.b)(),a=Object(j.c)((function(e){return pe.selectById(e,r)})),i=Object(j.c)((function(e){return he(e).loading})),s=Object(j.c)((function(e){return he(e).error}));return Object(n.useEffect)((function(){c(Oe())})),Object(v.jsxs)(Me.a.Row,{children:[Object(v.jsx)(Me.a.Cell,{children:Object(v.jsxs)(u.b,{to:"/products/".concat(r),children:[Object(v.jsx)(Ie.a,{size:"tiny",inline:!0,src:Ae(r)}),"\xa0",i?Object(v.jsx)(Je.a,{fluid:!0,children:Object(v.jsx)(Je.a.Line,{})}):s?Object(v.jsx)(Se.a,{error:!0,content:s}):a?a.name:void 0]})}),Object(v.jsx)(Me.a.Cell,{children:t.products[r].quantity}),Object(v.jsx)(Me.a.Cell,{children:Object(v.jsx)("span",{className:"price",children:Te.format(t.products[r].unitPrice)})})]})}var Qe=function(){var e=Object(j.b)(),t=Object(d.i)(),r=Object(d.g)(),c=Object(n.useState)(0),a=Object(C.a)(c,2),i=a[0],s=a[1],o=Object(j.c)((function(e){return ae.selectById(e,t.params.orderId)})),l=Object(j.c)((function(e){return ce(e).loading})),b=Object(j.c)((function(e){return ce(e).error}));function h(){e(oe(o.id)),Object.keys(o.products).forEach((function(t){e(me({productId:parseInt(t),quantity:o.products[t].quantity}))})),r.replace("/orders")}return Object(n.useEffect)((function(){e(ie())})),Object(n.useEffect)((function(){if(o&&o.products){var e=Object.keys(o.products);e&&e.length&&s(e.reduce((function(e,t){var r=o.products[t];return e+r.quantity*r.unitPrice}),0))}}),[o]),l?Object(v.jsx)(Re,{what:"order"}):b?Object(v.jsx)(Se.a,{error:!0,content:b}):o?Object(v.jsxs)(Ce.a,{celled:!0,container:!0,children:[Object(v.jsxs)(Ce.a.Row,{children:[Object(v.jsxs)(Ce.a.Column,{width:6,children:["Order id: ",Object(v.jsx)("b",{children:o.id})]}),Object(v.jsxs)(Ce.a.Column,{width:4,children:["Order date: ",o.date]}),Object(v.jsxs)(Ce.a.Column,{width:6,children:["Order status: ",te(o.status)]})]}),Object(v.jsx)(Ce.a.Row,{children:Object(v.jsx)(Ce.a.Column,{width:16,children:Object(v.jsxs)(Me.a,{striped:!0,children:[Object(v.jsx)(Me.a.Header,{children:Object(v.jsxs)(Me.a.Row,{children:[Object(v.jsx)(Me.a.HeaderCell,{width:10,children:"Product"}),Object(v.jsx)(Me.a.HeaderCell,{width:3,children:"Quantity"}),Object(v.jsx)(Me.a.HeaderCell,{width:3,children:"Unit Price"})]})}),Object(v.jsx)(Me.a.Body,{children:Object.keys(o.products).map((function(e){return Object(v.jsx)(ze,{order:o,productId:e},e)}))})]})})}),Object(v.jsxs)(Ce.a.Row,{children:[Object(v.jsxs)(Ce.a.Column,{width:10,children:["Order total:\xa0",Object(v.jsx)("b",{children:Object(v.jsx)("span",{className:"price",children:Te.format(i)})})]}),Object(v.jsx)(Ce.a.Column,{width:6,children:Object(v.jsxs)(I.a.Group,{fluid:!0,children:[Object(v.jsx)(I.a,{icon:"arrow alternate circle left outline",content:"All orders",as:u.b,to:"/orders"}),Object(v.jsx)(I.a,{icon:"trash alternate",negative:!0,onClick:function(){return h(o.id)},content:"Cancel order"})]})})]})]}):null};function Ue(){return Object(v.jsxs)(i.a,{children:[Object(v.jsx)(w,{}),Object(v.jsxs)(d.d,{children:[Object(v.jsx)(d.b,{path:"/orders/:orderId",children:Object(v.jsx)(Qe,{})}),Object(v.jsx)(d.b,{path:"/orders",children:Object(v.jsx)(Le,{})}),Object(v.jsx)(d.b,{path:"/cart",children:Object(v.jsx)(Ge,{})}),Object(v.jsx)(d.b,{path:"/main",children:Object(v.jsx)(we,{})}),Object(v.jsx)(d.b,{path:"/products/:productId",children:Object(v.jsx)(Be,{})}),Object(v.jsx)(d.b,{path:"/products",children:Object(v.jsx)(Ne,{})}),Object(v.jsx)(d.b,{path:"/",children:Object(v.jsx)(d.a,{to:"/main"})})]})]})}var Ve,_e=r(78),$e=Object(b.a)({reducer:(Ve={},Object(_e.a)(Ve,xe.name,ge),Object(_e.a)(Ve,de.name,ue),Object(_e.a)(Ve,h.name,g),Ve)});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(Object(v.jsx)(u.a,{children:Object(v.jsx)(j.a,{store:$e,children:Object(v.jsx)(Ue,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[299,1,2]]]);
//# sourceMappingURL=main.73541954.chunk.js.map