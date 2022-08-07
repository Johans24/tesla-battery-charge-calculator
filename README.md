# Front-end Development Challenge

This is a technical challenge to test Front-end development-related skills. By
building a working example we can better understand your way of working, how
you structure your code, thoughts, and take some design decisions along the
way. What we ultimately want to see is how far you can go, given the requirements
described here

## Landing page with basic reactivity

We provide the desktop version of a landing page of a hypotetic Tesla Model S
website. It includes a battery range calculator that should use some basic
reactivity principles.

We provide all assets required to build the project but you're free to inspect and export them from
the design file. [Adobe XD][xd] is [free for download][xd] and is available for both macOS and
Windows.

The design file is organized with artboards containing all required assets to complete this challenge.

> There are some online services, like [PSDETCH](https://psdetch.com/) that you
> can check Adobe XD files in your browser
>
> If you have any trouble to open the layout or using the provided assets, please send us a message
> and we'll help you and providing an alternative.

Your challenge is to implement the provided design following the requirements below.

## Requirements

### Functionals

- Clicking on the arrow-down icon in the first hero section should point the user to the
  battery range calculator
- Implement a battery range calculator for two types of the Tesla Model S that
  displays the maximum distance covered by each type of car, based on the user
  choices for speed, temperature (with and without heating/cooling), and wheel size.
  It should have the following controls
  - A range of speeds from `70` to `140` km/h using steps of `10km`;
  - A range of temperatures from `-10º` to `40º` using steps of `10º`
  - A toggle for air conditioner/heating system. The temperature should affect how this component
    is displayed
  - A wheel size selection with `19"` and `21"`.
- Use the JSON files from the `data/` directory to build the calculator behavior

> Use the [reactivity example file](reactivity-example.html) for a visual representation of the calculator.

### Non-functionals

- The project MUST be written in HTML, JavaScript and CSS, _without using any other
  library or framework_
  - You can, by your choice, make use of a CSS pre/postprocessor and polyfills
    (i.e Sass, LESS,  Stylus, PostCSS).
  - You can, by your choice, make use of a module bundler or other automation tools (i.e. webpack, Parcel, babel, Roll-up).
- Make the design responsive; it's up to you to decide how the design should look
  like on smaller and very large screens.
- It MUST be compatible with modern browsers, but also include IE11 and non-Chromium Edge.
- Include a `README.md` file with instructions of how to run your final project.
- It MUST provide a usable version of the project whenever _JavaScript is disabled_.
- Make sure that the project is SEO-friendly by using proper HTML semantics.
- All resources MUST be optimized for content delivery

#### Bonus points

- 🤩 Use animations to make the interactions with the UI more fluid.
- ♿️ Make your project fully responsive without sacrificing either usability _or_ accessibility
- 🐢 Keep an eye on performance and apply optimizations as much as you can.
- 🚀 Deploy it as a static website on [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
- 💯 Make sure your project is [well-tested](https://martinfowler.com/articles/practical-test-pyramid.html)

> Note: Your project **MUST** be fully functional after following the instructions
> of your `README.md` file.

## Delivering the project

- Package the project in a zip file
- In the message inviting you to take this test contains a link from our recruitment platform where you can
  upload your test
- We encourage you to upload the packaged test to Google Drive/Dropbox and include a link in the message
  of your submission.

## Tips

- Microsoft provides [free Windows virtual machine][vms] images for both Internet
  Explorer and Edge.
- [BrowserStack][browserstack] offers a free trial that you can use to test on
  different platforms and browsers.
- Several assets are already exported and included in the `images/` directory
- You can export an asset from Adobe XD by selecting an object and using the `File > Export..`
  menu

[xd]: https://www.adobe.com/nl/products/xd.html
[browserstack]: https://www.browserstack.com/
[vms]: https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/
