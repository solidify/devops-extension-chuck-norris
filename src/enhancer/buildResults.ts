import Controls = require("VSS/Controls");
import VSS_Service = require("VSS/Service");
import TFS_Build_Contracts = require("TFS/Build/Contracts");
import TFS_Build_Extension_Contracts = require("TFS/Build/ExtensionContracts");
import TFS_Build = require("TFS/Build/RestClient");
import DT_Client = require("TFS/DistributedTask/TaskRestClient");
import VSS_Context = require("VSS/Context");

export class BuildResultsSection extends Controls.BaseControl {

    constructor() {
        super();
    }

    private quotes: string[] = [
        "When Chuck Norris throws exceptions, it’s across the room.",
        "All arrays Chuck Norris declares are of infinite size, because Chuck Norris knows no bounds.",
        "Chuck Norris doesn’t have disk latency because the hard drive knows to hurry the hell up.",
        "Chuck Norris writes code that optimizes itself.",
        "Chuck Norris can’t test for equality because he has no equal.",
        "Chuck Norris doesn’t need garbage collection because he doesn’t call .Dispose(), he calls .DropKick().",
        "Chuck Norris’s first program was kill -9.",
        "Chuck Norris burst the dot com bubble.",
        "All browsers support the hex definitions #chuck and #norris for the colors black and blue.",
        "Chuck Norris can write infinite recursion functions…and have them return.",
        "Chuck Norris can solve the Towers of Hanoi in one move.",
        "The only pattern Chuck Norris knows is God Object.",
        "Chuck Norris finished World of Warcraft.",
        "Project managers never ask Chuck Norris for estimations…ever.",
        "Chuck Norris doesn’t use web standards as the web will conform to him.",
        "“It works on my machine” always holds true for Chuck Norris.",
        "Whiteboards are white because Chuck Norris scared them that way.",
        "Chuck Norris doesn’t do Burn Down charts, he does Smack Down charts.",
        "Chuck Norris can delete the Recycling Bin.",
        "Chuck Norris’s beard can type 140 wpm.",
        "Chuck Norris can unit test entire applications with a single assert.",
        "Chuck Norris doesn’t bug hunt as that signifies a probability of failure, he goes bug killing.",
        "Chuck Norris’s keyboard doesn’t have a Ctrl key because nothing controls Chuck Norris.",
        "Chuck Norris CAN divide by 0.",
        "Chuck Norris’ keyboard has 2 keys: 0 and 1.",
        "Chuck Norris can access private methods.",
        "Chuck Norris can instantiate an abstract class.",
        "Chuck Norris does not need to know about class factory pattern.He can instantiate interfaces.",
        "The class object inherits from Chuck Norris",
        "Chuck Norris doesn’t use strongly- typed languages.He uses strong languages.",
        "Chuck Norris knows the last digit of PI.",
        "Chuck Norris doesn’t pair program.",
        "Chuck Norris can write multi- threaded applications with a single thread",
        "There is no Esc key on Chuck Norris’ keyboard, because no one escapes Chuck Norris.",
        "Visual SourceSafe actually works for Chuck Norris.",
        "Chuck Norris can access the DB from the UI",
        "Chuck Norris’ programs never exit, they terminate!",
        "Chuck Norris programs occupy 150% of CPU, even when they are not executing.",
        "Chuck Norris programs do not accept input.",
        "Chuck Norris can spawn threads that complete before they are started."
    ];

    private _quote: string;
    private _isInitialized = false;

    public initialize(): void {
        super.initialize();

        var vstsVersion = VSS_Context.getPageContext().diagnostics.webPlatformVersion
        var extensionVersion = VSS.getExtensionContext().version;
        var publisherId = VSS.getExtensionContext().publisherId;
        var extensionId = VSS.getExtensionContext().extensionId
        console.log("--- VSTS version: " + vstsVersion);
        console.log("--- Extension version: " + extensionVersion);
        console.log(`--- Publisher.Extension: ${publisherId}.${extensionId}`)

        var n = Math.floor(Math.random() * this.quotes.length);
        this._quote = this.quotes[n];
        this._element.find("#quote").text(this._quote);

        var sharedConfig: TFS_Build_Extension_Contracts.IBuildResultsViewExtensionConfig = VSS.getConfiguration();
        if (sharedConfig) {
            this._setSectionVisibility(sharedConfig, false);
            sharedConfig.onBuildChanged((build: TFS_Build_Contracts.Build) => {
                console.log("before init");
                if (!this._isInitialized) {
                    console.log("initializing");
                    this._updateBuildReportSection(sharedConfig, build);
                    this._isInitialized = true;
                }
                this._updateBuildStatus(build);
            });
        }
    }

    private _updateBuildReportSection(sharedConfig: TFS_Build_Extension_Contracts.IBuildResultsViewExtensionConfig,
        build: TFS_Build_Contracts.Build) {
        if (sharedConfig) {
            var showMrNorris = false;
            var buildClient: TFS_Build.BuildHttpClient3_1 = TFS_Build.getClient();
            buildClient.getDefinition(build.definition.id, VSS.getWebContext().project.name).then(buildDefinition => {
                buildDefinition.build.forEach(step => {
                    if (step.task.id == "6785970c-2d58-4260-b047-0a54028ee9c1") {
                        showMrNorris = true;
                        console.log("Found mr Norris!")
                    }
                });
                this._setSectionVisibility(sharedConfig, showMrNorris);
            });
        }
    }

    private _setSectionVisibility(sharedConfig: TFS_Build_Extension_Contracts.IBuildResultsViewExtensionConfig, enabled: boolean) {
        var publisherId = VSS.getExtensionContext().publisherId;
        var extensionId = VSS.getExtensionContext().extensionId
        var sectionId = "chuck-norris-build-status-section";
        var section = `${publisherId}.${extensionId}.${sectionId}`;
        try {
            console.log(`Setting ${section} to ${enabled}.`)
            var x: any = sharedConfig;
            x.setSectionVisibility(section, enabled);
        } catch (error) {
            console.log("Failed to set build section visibility.")
        }
    }

    private _updateBuildStatus(build: TFS_Build_Contracts.Build) {

        var sharedConfig: TFS_Build_Extension_Contracts.IBuildResultsViewExtensionConfig = VSS.getConfiguration();

        var imgSource = "images/chuck-wait.png";
        if (build.status === TFS_Build_Contracts.BuildStatus.InProgress) {
            imgSource = "images/chuck-wait.png";
            this._element.find("#quote").text("Working on it...");
        }
        else if (build.status === TFS_Build_Contracts.BuildStatus.Completed) {
            if (build.result === TFS_Build_Contracts.BuildResult.Succeeded) {
                imgSource = "images/chuck-ok.png";
            }
            else if (build.result === TFS_Build_Contracts.BuildResult.PartiallySucceeded) {
                imgSource = "images/chuck-warning.png";
            }
            else if (build.result === TFS_Build_Contracts.BuildResult.Failed) {
                imgSource = "images/chuck-error.png";
            }
            this._element.find("#quote").text(this._quote);
        }
        this._element.find("#status-img").attr("src", imgSource);
    }
}

BuildResultsSection.enhance(BuildResultsSection, $(".build-status"), {});

// Notify the parent frame that the host has been loaded
VSS.notifyLoadSucceeded();