# Meteor Todo App with Jscrambler integrated

This is a Todos example app built on the principles described in the [Meteor Guide](http://guide.meteor.com/structure.html).

### Running the app

- Complete **packages/jscrambler/plugin/jscrambler_config.json** with your custom configuration (ACCESS\_KEY, SECRET\_KEY, APP\_ID, etc).

Install dependencies: 

```bash
meteor npm install
```

Run in production mode to protect with jscrambler:

```bash
meteor run --production
```