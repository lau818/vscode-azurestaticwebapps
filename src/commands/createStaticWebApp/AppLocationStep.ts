/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureWizardPromptStep } from "vscode-azureextensionui";
import { ext } from "../../extensionVariables";
import { localize } from "../../utils/localize";
import { addLocationTelemetry } from "./addLocationTelemetry";
import { IStaticWebAppWizardContext } from "./IStaticWebAppWizardContext";

export class AppLocationStep extends AzureWizardPromptStep<IStaticWebAppWizardContext> {
    public async prompt(wizardContext: IStaticWebAppWizardContext): Promise<void> {
        const defaultLocation: string = '/';
        wizardContext.appLocation = (await ext.ui.showInputBox({
            value: defaultLocation,
            prompt: localize('appLocation', "Enter the location of your application code. For example, '/' represents the root of your app, while '/app' represents a directory called 'app'.")
        })).trim();
        addLocationTelemetry(wizardContext, 'appLocation', defaultLocation);
    }

    public shouldPrompt(wizardContext: IStaticWebAppWizardContext): boolean {
        return !wizardContext.appLocation;
    }

}
