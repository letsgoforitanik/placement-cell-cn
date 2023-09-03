import passport from "passport";
import { Strategy as LocalStrategy, IVerifyOptions } from "passport-local";
import { employeeService } from "@/services";
import { validateSignIn } from "@/helpers";

type DoneFunction = (error: any, user?: Express.User | false, options?: IVerifyOptions) => void;

const options = { usernameField: 'email', passwordField: 'password' };

async function verify(email: string, password: string, done: DoneFunction) {

    const response = validateSignIn(email, password);
    if (!response.success) return done(response.errors, false);

    const result = await employeeService.findEmployeeByEmail(response.data.email);
    if (!result.success) return done(result.errors, false);

    const employee = result.data;

    const matched = await employee.validatePassword(password);

    if (!matched) return done([{ path: 'password', message: 'Wrong password entered' }], false);

    return done(null, employee);

}

const localStrategy = new LocalStrategy(options, verify);

passport.use(localStrategy);

passport.serializeUser((user: any, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) => {
    const result = await employeeService.findEmployeeById(id);
    if (!result.success) return done(null, false);
    const user = result.data;
    return done(null, user);
});

export default passport;