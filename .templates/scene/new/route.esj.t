---
inject: true
to: src/routes.js
before: "notfound: {"
---

  <%=name%>: {
      key: '<%=name%>',
      name: '<%=name%>',
      path: '<%=route%>',
      component: <%=name%>,
      crumb: ['inicio']
  },
