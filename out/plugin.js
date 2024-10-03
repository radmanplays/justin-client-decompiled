(() => {
  // src/Main.ts
  ModAPI.meta.title("Justin v2");
  ModAPI.meta.credits("Murturtle");
  ModAPI.meta.description("Press right shift ;)");
  ModAPI.require("player");
  ModAPI.require("network");
  ModAPI.require("settings");
  ModAPI.require("world");
  document.body.appendChild(document.createElement("style"));
  var styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`);
  styleSheet.insertRule(`
  ::-webkit-scrollbar {
    width: 10px;
  }
`);
  styleSheet.insertRule(`
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
`);
  styleSheet.insertRule(`
  ::-webkit-scrollbar-thumb {
    background: rgba(100, 100, 100, 0.5);
    filter: blur(4px);
  }
`);
  styleSheet.insertRule(`
  ::-webkit-resizer {
    background: rgba(0, 0, 0, 0);
    opacity: 0;
    display: none;
  }
`);
  styleSheet.insertRule(`
  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
    opacity: 0;
    display: none;
  }
`);
  styleSheet.insertRule(`
  @keyframes rgb-glow {
    0% { box-shadow: 0px 0px 40px rgba(255, 0, 0, 0.75); }
    16% { box-shadow: 0px 0px 40px rgba(255, 255, 0, 0.75); }
    33% { box-shadow: 0px 0px 40px rgba(0, 255, 0, 0.75); }
    50% { box-shadow: 0px 0px 40px rgba(0, 255, 255, 0.75); }
    66% { box-shadow: 0px 0px 40px rgba(0, 0, 255, 0.75); }
    83% { box-shadow: 0px 0px 40px rgba(255, 0, 255, 0.75); }
    100% { box-shadow: 0px 0px 40px rgba(255, 0, 0, 0.75); }
  }
`);
  styleSheet.insertRule(`
  @keyframes rgb-text {
    0% { color: rgba(255, 0, 0, 0.75); }
    16% { color: rgba(255, 255, 0, 0.75); }
    33% { color: rgba(0, 255, 0, 0.75); }
    50% { color: rgba(0, 255, 255, 0.75); }
    66% { color: rgba(0, 0, 255, 0.75); }
    83% { color: rgba(255, 0, 255, 0.75); }
    100% { color: rgba(255, 0, 0, 0.75); }
  }
`);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL01haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIk1vZEFQSS5tZXRhLnRpdGxlKFwiSnVzdGluIHYyXCIpO1xuTW9kQVBJLm1ldGEuY3JlZGl0cyhcIk11cnR1cnRsZVwiKTtcbk1vZEFQSS5tZXRhLmRlc2NyaXB0aW9uKFwiUHJlc3MgcmlnaHQgc2hpZnQgOylcIik7XG5Nb2RBUEkucmVxdWlyZShcInBsYXllclwiKTtcbk1vZEFQSS5yZXF1aXJlKFwibmV0d29ya1wiKTtcbk1vZEFQSS5yZXF1aXJlKFwic2V0dGluZ3NcIik7XG5Nb2RBUEkucmVxdWlyZShcIndvcmxkXCIpO1xuXG5cblxuLy9UT0RPOiBwcmV0dHkgc3VyZSB0aGlzIHBhcnQgaXMgdXNlbGVzcyhpIHVzZWQgY2hhdGdwdCBmb3IgcmVuYW1pbmcgdGhpbmdzIGFuZCBhZGRpbmcgY29tbWVudHMpXG5cbi8vIENyZWF0ZSBhbmQgYXBwZW5kIGEgPHN0eWxlPiBlbGVtZW50IHRvIHRoZSBib2R5XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKSk7XG5cbi8vIEdldCByZWZlcmVuY2UgdG8gdGhlIGZpcnN0IHN0eWxlc2hlZXRcbmNvbnN0IHN0eWxlU2hlZXQgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1swXTtcblxuLy8gSW5zZXJ0IGtleWZyYW1lIGFuaW1hdGlvbiBmb3IgZmFkZS1pbiBlZmZlY3RcbnN0eWxlU2hlZXQuaW5zZXJ0UnVsZShgXG4gIEBrZXlmcmFtZXMgZmFkZS1pbiB7XG4gICAgZnJvbSB7IG9wYWNpdHk6IDA7IH1cbiAgICB0byB7IG9wYWNpdHk6IDE7IH1cbiAgfVxuYCk7XG5cbi8vIEN1c3RvbWl6ZSBzY3JvbGxiYXIgd2lkdGhcbnN0eWxlU2hlZXQuaW5zZXJ0UnVsZShgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIHdpZHRoOiAxMHB4O1xuICB9XG5gKTtcblxuLy8gQ3VzdG9taXplIHNjcm9sbGJhciB0cmFjayAoYmFja2dyb3VuZCkgYXBwZWFyYW5jZVxuc3R5bGVTaGVldC5pbnNlcnRSdWxlKGBcbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwKTtcbiAgfVxuYCk7XG5cbi8vIEN1c3RvbWl6ZSBzY3JvbGxiYXIgdGh1bWIgKHRoZSBkcmFnZ2FibGUgcGFydClcbnN0eWxlU2hlZXQuaW5zZXJ0UnVsZShgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMTAwLCAxMDAsIDEwMCwgMC41KTtcbiAgICBmaWx0ZXI6IGJsdXIoNHB4KTtcbiAgfVxuYCk7XG5cbi8vIEhpZGUgdGhlIHNjcm9sbGJhciByZXNpemVyIChib3R0b20tcmlnaHQgY29ybmVyKVxuc3R5bGVTaGVldC5pbnNlcnRSdWxlKGBcbiAgOjotd2Via2l0LXJlc2l6ZXIge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMCk7XG4gICAgb3BhY2l0eTogMDtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5gKTtcblxuLy8gSGlkZSB0aGUgc2Nyb2xsYmFyIGNvcm5lciAoaW50ZXJzZWN0aW9uIG9mIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNjcm9sbGJhcnMpXG5zdHlsZVNoZWV0Lmluc2VydFJ1bGUoYFxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lciB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwKTtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbmApO1xuXG4vLyBJbnNlcnQga2V5ZnJhbWUgYW5pbWF0aW9uIGZvciBSR0IgZ2xvd2luZyBib3ggc2hhZG93IGVmZmVjdFxuc3R5bGVTaGVldC5pbnNlcnRSdWxlKGBcbiAgQGtleWZyYW1lcyByZ2ItZ2xvdyB7XG4gICAgMCUgeyBib3gtc2hhZG93OiAwcHggMHB4IDQwcHggcmdiYSgyNTUsIDAsIDAsIDAuNzUpOyB9XG4gICAgMTYlIHsgYm94LXNoYWRvdzogMHB4IDBweCA0MHB4IHJnYmEoMjU1LCAyNTUsIDAsIDAuNzUpOyB9XG4gICAgMzMlIHsgYm94LXNoYWRvdzogMHB4IDBweCA0MHB4IHJnYmEoMCwgMjU1LCAwLCAwLjc1KTsgfVxuICAgIDUwJSB7IGJveC1zaGFkb3c6IDBweCAwcHggNDBweCByZ2JhKDAsIDI1NSwgMjU1LCAwLjc1KTsgfVxuICAgIDY2JSB7IGJveC1zaGFkb3c6IDBweCAwcHggNDBweCByZ2JhKDAsIDAsIDI1NSwgMC43NSk7IH1cbiAgICA4MyUgeyBib3gtc2hhZG93OiAwcHggMHB4IDQwcHggcmdiYSgyNTUsIDAsIDI1NSwgMC43NSk7IH1cbiAgICAxMDAlIHsgYm94LXNoYWRvdzogMHB4IDBweCA0MHB4IHJnYmEoMjU1LCAwLCAwLCAwLjc1KTsgfVxuICB9XG5gKTtcblxuLy8gSW5zZXJ0IGtleWZyYW1lIGFuaW1hdGlvbiBmb3IgUkdCIHRleHQgY29sb3IgZWZmZWN0XG5zdHlsZVNoZWV0Lmluc2VydFJ1bGUoYFxuICBAa2V5ZnJhbWVzIHJnYi10ZXh0IHtcbiAgICAwJSB7IGNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC43NSk7IH1cbiAgICAxNiUgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMCwgMC43NSk7IH1cbiAgICAzMyUgeyBjb2xvcjogcmdiYSgwLCAyNTUsIDAsIDAuNzUpOyB9XG4gICAgNTAlIHsgY29sb3I6IHJnYmEoMCwgMjU1LCAyNTUsIDAuNzUpOyB9XG4gICAgNjYlIHsgY29sb3I6IHJnYmEoMCwgMCwgMjU1LCAwLjc1KTsgfVxuICAgIDgzJSB7IGNvbG9yOiByZ2JhKDI1NSwgMCwgMjU1LCAwLjc1KTsgfVxuICAgIDEwMCUgeyBjb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuNzUpOyB9XG4gIH1cbmApO1xuXG5cblxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxTQUFPLEtBQUssTUFBTSxXQUFXO0FBQzdCLFNBQU8sS0FBSyxRQUFRLFdBQVc7QUFDL0IsU0FBTyxLQUFLLFlBQVksc0JBQXNCO0FBQzlDLFNBQU8sUUFBUSxRQUFRO0FBQ3ZCLFNBQU8sUUFBUSxTQUFTO0FBQ3hCLFNBQU8sUUFBUSxVQUFVO0FBQ3pCLFNBQU8sUUFBUSxPQUFPO0FBT3RCLFdBQVMsS0FBSyxZQUFZLFNBQVMsY0FBYyxPQUFPLENBQUM7QUFHekQsTUFBTSxhQUFhLFNBQVMsWUFBWSxDQUFDO0FBR3pDLGFBQVcsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FLckI7QUFHRCxhQUFXLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUlyQjtBQUdELGFBQVcsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBLENBSXJCO0FBR0QsYUFBVyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUtyQjtBQUdELGFBQVcsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQU1yQjtBQUdELGFBQVcsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQU1yQjtBQUdELGFBQVcsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBVXJCO0FBR0QsYUFBVyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FVckI7IiwKICAibmFtZXMiOiBbXQp9Cg==
