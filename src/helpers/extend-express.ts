import express from "express";

export default function extendExpress() {

    // This helper method serializes errors and set them in flash
    // it also serializes the current request body in flash
    // serialized values are deserialized by the 'locals' middleware
    express.request.setFlashErrors = function (arg: any) {

        if (typeof arg === 'string') {
            arg = [{ path: '', message: arg }];
        }

        const errors: AppError[] = arg;

        const messages = [];

        for (const error of errors) {
            const message = error.path + "|" + error.message
            messages.push(message);
        }

        this.flash('errors', messages);
        this.flash('last-request-body', JSON.stringify(this.body));

    };

    // This method sets the message in flash
    // the message value is retrieved by the 'locals' middleware
    express.request.setFlashMessage = function (message: string) {
        this.flash('message', message);
    }

}