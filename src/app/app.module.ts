import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MainPageComponent } from './main-page/main-page.component';
import { AvatarModule } from 'ngx-avatar';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatsComponent } from './chats/chats.component';
import {MatTableModule} from '@angular/material/table';
import { GroupsComponent } from './groups/groups.component';
import { InboxComponent } from './inbox/inbox.component';
import {MatSelectModule} from '@angular/material/select';
import { CreateChatroomComponent } from './create-chatroom/create-chatroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { AngularEmojisModule } from 'angular-emojis';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainPageComponent,
    UserProfileComponent,
    ChatsComponent,
    GroupsComponent,
    InboxComponent,
    CreateChatroomComponent,
    ChatroomComponent,
    EditGroupComponent,
    
    
    
   

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    AvatarModule,
    MatTableModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    AngularEmojisModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
