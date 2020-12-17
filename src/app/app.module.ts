import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { AngularSvgIconModule, SvgLoader } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import { SvgBrowserLoader } from './utils/svg-browser.loader';
import { SvgServerLoader } from './utils/svg-server.loader';


export function svgLoaderFactory(http: HttpClient, transferState: TransferState, platformId: any): SvgServerLoader | SvgBrowserLoader {
  if (isPlatformServer(platformId)) {
    return new SvgServerLoader('../browser/assets', transferState);
  } else {
    return new SvgBrowserLoader(http, transferState);
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-app'}),
    BrowserTransferStateModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot({
      loader: {
        provide: SvgLoader,
        useFactory: svgLoaderFactory,
        deps: [ HttpClient, TransferState, PLATFORM_ID ],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
