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
    UIAlertView *alertView = [[UIAlertView alloc]initWithTitle:@"Native Code" message:myMessage delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"Ok", nil];
    [alertView show];
}

@end
