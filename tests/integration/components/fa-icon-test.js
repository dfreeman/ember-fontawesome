import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import { htmlSafe } from '@ember/string';

const faCoffee = {
  prefix: 'fas',
  iconName: 'coffee',
  icon: [
    640,
    512,
    [],
    "f0f4",
    "M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"
  ]
}

moduleForComponent('fa-icon', 'Integration | Component | fa icon', {
  integration: true
})

test('it renders coffee', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('faCoffee', faCoffee)

  this.render(hbs`{{fa-icon icon=faCoffee}}`)

  assert.equal(this.$().text().trim(), '')
  assert.equal(this.$('svg').attr('data-icon'), 'coffee')
  assert.ok(this.$('svg').attr('class').split(/\s+/).includes('fa-coffee'))
  assert.equal(this.$('svg path').attr('d'), faCoffee.icon[4])
})

test('it renders framework style', function(assert){
  this.set('faCoffee', faCoffee)
  this.render(hbs`{{fa-icon icon=faCoffee transform="rotate-42"}}`)
  assert.ok(this.$('svg').attr('style').split(/:/).includes('transform-origin'))
})

test('it renders extra classes', function(assert){
  this.set('faCoffee', faCoffee)
  this.set('class', 'foo-xyz')
  this.render(hbs`{{fa-icon icon=faCoffee class=class}}`)
  assert.ok(this.$('svg').attr('class').split(/\s+/).includes('foo-xyz'))
  this.set('class', 'foo-new-class')
  assert.notOk(this.$('svg').attr('class').split(/\s+/).includes('foo-xyz'))
  assert.ok(this.$('svg').attr('class').split(/\s+/).includes('foo-new-class'))
})

test('it renders coffee positional', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('faCoffee', faCoffee)

  this.render(hbs`{{fa-icon faCoffee}}`)

  assert.equal(this.$().text().trim(), '')
  assert.equal(this.$('svg').attr('data-icon'), 'coffee')
  assert.ok(this.$('svg').attr('class').split(/\s+/).includes('fa-coffee'))
  assert.equal(this.$('svg path').attr('d'), faCoffee.icon[4])
})

test('it optionally renders fa-spin class', function(assert){
  assert.expect(2)
  this.set('faCoffee', faCoffee)
  this.set('isSpinning', false)

  this.render(hbs`{{fa-icon icon=faCoffee spin=isSpinning}}`)

  assert.notOk(this.$('svg').attr('class').split(/\s+/).includes('fa-spin'), 'Should not include fa-spin class')
  this.set('isSpinning', true)
  assert.ok(this.$('svg').attr('class').split(/\s+/).includes('fa-spin'), 'Should include fa-spin class')
})

test('it binds title', function (assert) {
  assert.expect(2);
  const title = 'awesome is as awesome does';
  this.set('title', title);
  this.set('faCoffee', faCoffee);

  this.render(hbs`{{fa-icon icon=faCoffee title=title}}`);

  assert.equal(this.$('svg title').length, 1, 'has title element');
  assert.equal(this.$('svg title').text().trim(), title, 'title is correct');
});

test('no title attribute gives no title element', function (assert) {
  assert.expect(1);
  this.set('faCoffee', faCoffee);

  this.render(hbs`{{fa-icon icon=faCoffee}}`);

  assert.equal(this.$('svg title').length, 0, 'has not title element');
});

test('title from string like object', function (assert) {
  assert.expect(2);
  const title = 'awesome is as awesome does';
  this.set('title', htmlSafe(title));
  this.set('faCoffee', faCoffee);

  this.render(hbs`{{fa-icon icon=faCoffee title=title}}`);

  assert.equal(this.$('svg title').length, 1, 'has title element');
  assert.equal(this.$('svg title').text().trim(), title, 'title is correct');
});
