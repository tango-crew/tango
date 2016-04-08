function World() {
  this.visit = function (url, callback) {
    console.log('Visiting..');
  };
}

module.exports = function() {
  this.World = World;
};
