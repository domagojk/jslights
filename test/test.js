describe('jsLights', function () {

  it('should exists', function () {
    expect(jsLights).to.exist;
  });

  it('should register and use deps', function (done) {
    jsLights.register("nekiNamespace", function(params) {
      return function() {
        return "neki";
      };
    });

    jsLights.register("blabla", function(deps) {
      if (deps.nekiNamespace() == "neki") {
        done();
      } else {
        done();
      }
    }).dependency("nekiNamespace");
  });
});