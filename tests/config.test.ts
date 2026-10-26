import test from 'node:test';
import assert from 'node:assert/strict';
import { getDriveFile, getGoogleResourceId, readConfig } from '../src/lib/config';

test('only expected Google document URLs are accepted', () => {
 assert.equal(getGoogleResourceId('https://docs.google.com/spreadsheets/d/sheet-123/edit','sheet'),'sheet-123');
 assert.equal(getGoogleResourceId('https://drive.google.com/drive/folders/folder-123','folder'),'folder-123');
 assert.deepEqual(getDriveFile('https://drive.google.com/file/d/photo-123/view?resourcekey=abc'),{id:'photo-123',resourceKey:'abc'});
 assert.deepEqual(getDriveFile('https://drive.google.com/open?id=photo-123'),{id:'photo-123',resourceKey:undefined});
 assert.throws(()=>getDriveFile('https://evil.example/photo.png'));
 assert.throws(()=>getDriveFile('https://drive.google.com.evil.example/file/d/abc/view'));
 assert.throws(()=>getGoogleResourceId('http://docs.google.com/spreadsheets/d/abc','sheet'));
});

test('production cannot accidentally render demo stock when setup is missing',()=>{
 const result=readConfig({NODE_ENV:'production'});
 assert.equal(result.mode,'sheets');
 assert.ok(result.missing.includes('GOOGLE_SHEET_URL'));
});

test('demo is explicit and credentials never appear in public site settings',()=>{
 const result=readConfig({CATALOG_MODE:'demo',GOOGLE_PRIVATE_KEY:'PRIVATE'});
 assert.equal(result.mode,'demo');
 assert.deepEqual(result.missing,[]);
 assert.equal(JSON.stringify(result.site).includes('PRIVATE'),false);
});
