const expect = require('chai').expect;
it('should add number', function () {
    const num1 = 2;
    const num2 = 3;
    expect(num1+num2).to.equal(5);

});

it('should  not give a 6', function () {
    const num1 = 3;
    const num2 = 3;
    expect(num1+num2).not.to.equal(6);

});