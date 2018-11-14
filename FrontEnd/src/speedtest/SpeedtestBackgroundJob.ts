
import { Plugins } from '@capacitor/core';
const { App, BackgroundTask } = Plugins;

App.addListener('appStateChange', (state) => {

    if (!state.isActive) {
      // The app has become inactive. We should check if we have some work left to do, and, if so,
      // execute a background task that will allow us to finish that work before the OS
      // suspends or terminates our app:
  
      let taskId = BackgroundTask.beforeExit(async () => {
        // In this function We might finish an upload, let a network request
        // finish, persist some data, or perform some other task
        console.log("call job")
        // Example
        setTimeout(() => {
          // Must call in order to end our task otherwise
          // we risk our app being terminated, and possibly
          // being labled as impacting battery life
          BackgroundTask.finish({
            taskId
          });
        }, 30000); // Set a long timeout as an example
      });
    }
  })