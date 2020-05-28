# React-Native Integration with Jscrambler

This Demo Application was forked from [React Native School - Grocery List](https://github.com/ReactNativeSchool/react-native-grocery-list).

This example has a **custom C++ lib** to exemplify the hability to interact with C++ code from JavaScript.

For each mobile platform (Android and IOS), there are custom modules to act as intermediaries for the interaction with C++. Android has a **custom Java module** and IOS has a **custom Objective-C module** to do that.

## Windows limitation

Possible *cMake* error during the build of the Android app: `CMake will not be able to correctly generate this project`.

This error might be related to the [Maximum Path Length limitation](https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file#maximum-path-length-limitation) in Windows.
*CMake* can produce long full paths during the build process and fail due to that limitation.
You'll need to move the project to another location to avoid hitting that limit and proceed with the build.

## Configuring Jscrambler

[See Jscramber documentation](https://docs.jscrambler.com/code-integrity/frameworks-and-libraries/react-native)