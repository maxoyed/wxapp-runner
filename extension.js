// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('wxappPreview', function () {
		let folder = vscode.workspace.workspaceFolders
		if (folder) {
			fs.readdir(folder[0].uri.fsPath, (err, files) => {
				if (files.indexOf('project.config.json') >= 0) {
					vscode.window.showInformationMessage('正在打开微信开发者工具')
					axios.get('http://127.0.0.1:21234/open', {
						params: {
							projectpath: "/Users/maxoyed/Documents/minapp/ygg_wxapp/students_client"
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					vscode.window.showErrorMessage('当前打开文件夹不是小程序项目')
				}
			})
		} else {
			vscode.window.showErrorMessage('当前工作区为空')
		}

	})

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

exports.deactivate = deactivate;