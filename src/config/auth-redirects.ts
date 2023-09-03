const authRedirects = {
    authorizedOnly: { failureRedirect: '/sign-in' },
    anonymousOnly: { failureRedirect: '/' }
}

export default authRedirects;