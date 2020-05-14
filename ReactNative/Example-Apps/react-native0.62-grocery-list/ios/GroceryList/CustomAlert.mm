#import "CustomAlert.h"
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>
#import "Hello.h"

@implementation CustomAlert


RCT_EXPORT_MODULE(CustomAlert);

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(showMessage:(NSString *)messageFromJs)
{
  NSString *cppString = [NSString stringWithUTF8String:greet().c_str()];

  NSString *myMessage = [NSString stringWithFormat:@"%@\nThis is from Objective-C\n%@", messageFromJs, cppString];

  UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"Native Code" message:myMessage preferredStyle:UIAlertControllerStyleAlert];

  UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * action) {}];

  [alert addAction:defaultAction];

  UIViewController *topController = [UIApplication sharedApplication].keyWindow.rootViewController;

  while (topController.presentedViewController) {
    topController = topController.presentedViewController;
  }

  [topController presentViewController:alert animated:YES completion:nil];
}

@end
