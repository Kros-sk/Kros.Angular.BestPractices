import { LoginState } from './login/login.state';
import { ProgressState } from './progress/progress.state';


export interface State {
    login: LoginState;
    progres: ProgressState;
}

