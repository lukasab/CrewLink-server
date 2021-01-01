import YAML from 'yaml';
import path from 'path';
import fs from 'fs';
import { ICEServer } from './ICEServer';

const PEER_CONFIG_PATH = path.join(__dirname, '..', 'config', 'peerConfig.yml');

interface PeerConfig {
	forceRelayOnly: boolean;
	iceServers?: ICEServer[]
}

const DEFAULT_PEER_CONFIG: PeerConfig = {
	forceRelayOnly: false,
	iceServers: [
		{
			urls: 'stun:stun.l.google.com:19302'
		}
	]
};

let peerConfig = DEFAULT_PEER_CONFIG;
if (fs.existsSync(PEER_CONFIG_PATH)) {
	try {
		peerConfig = YAML.parse(fs.readFileSync(PEER_CONFIG_PATH).toString('utf8'));
	} catch (err) {
		console.error(`Unable to load peer config file. Make sure it is valid YAML.\n${err}`);
	}
}

export default peerConfig
