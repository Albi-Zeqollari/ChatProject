import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatsComponent } from './chats/chats.component';
import { CreateChatroomComponent } from './create-chatroom/create-chatroom.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { GroupsComponent } from './groups/groups.component';
import { InboxComponent } from './inbox/inbox.component';

import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},

  {path:'register',component:RegisterComponent},

  {path:'main/:id',component:MainPageComponent},

  {path:'userprofile/:id',component:UserProfileComponent},

  {path:'chat',component:ChatsComponent},

  {path:'groups/:id',component:GroupsComponent},


  {path:'inbox/:id',component:InboxComponent},


  {path:'create-chat/:id',component:CreateChatroomComponent},
  

  {path:'edit-chat/:id',component:EditGroupComponent},
  

  {path:'chatroom/:id/:userid',component:ChatroomComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
