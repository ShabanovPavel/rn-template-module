package com.template;


//import android.content.Intent;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
// import android.widget.ImageView;
import com.reactnativenavigation.NavigationActivity;

// gesture handler
// import com.facebook.react.ReactActivityDelegate;
// import com.facebook.react.ReactRootView;
// import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;



public class MainActivity extends NavigationActivity {

   

//   @Override
//   protected ReactActivityDelegate createReactActivityDelegate() {
//     return new ReactActivityDelegate(this, getMainComponentName()) {
//       @Override
//       protected ReactRootView createRootView() {
//        return new RNGestureHandlerEnabledRootView(MainActivity.this);
//       }
//     };
//   }

     @Override
    protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
        SplashScreen.show(this);
       
    }
}
