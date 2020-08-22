import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private menu: MenuController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private clipboardService: ClipboardService
  ) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async goToLinkedin() {
    await this.presentLoading();
    window.location.href = 'https://es.linkedin.com/in/francisco-javier-s%C3%A1nchez-garc%C3%ADa-87080017a';
  }
  async goToGitHub() {
    await this.presentLoading();
    window.location.href = 'https://github.com/javisangar';
  }

  async goToMail() {
    await this.presentLoading();
    window.location.href = 'https://aemail.com/DkEA';
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      duration: 1500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Contact',
      message: 'sanchezgarciajavi92@gmail.com',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Copy',
          handler: () => {
            console.log('Confirm Okay');
            this.copy('sanchezgarciajavi92@gmail.com');
          }
        }
      ]
    });

    await alert.present();
  }

  copy(text: string) {
    this.clipboardService.copyFromContent(text);
  }
}
