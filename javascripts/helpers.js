Handlebars.registerHelper('currentPage', function(page) {
  return this.page == page ? 'active' : '';
});
