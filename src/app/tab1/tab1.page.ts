import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

const { Geolocation,Device,Network } = Plugins;

let handler = Network.addListener('networkStatusChange', (status) => {
  console.log("Network status changed", status);
});

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private tts: TextToSpeech) {}

  variable: string;


  parleMaintenant(){

    console.log('Texte lu:', this.variable );

    this.tts.speak({
      text: this.variable,
      locale: 'fr-FR',
      rate: 1
    })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));

  }

  async ionViewWillEnter(){
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);

    const info = await Device.getInfo();
    console.log('Device', info);

    console.log('Ceci est un message dans la console');
  }

}
