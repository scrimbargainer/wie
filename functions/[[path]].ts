 
 /* TSP: clean w/ TSv5.8.3 -> ES2020 (no JSX, no Module) */
 
 import { env } from "cloudflare:workers";
 /// "use strict";
 
 ;interface Objetc { [key :string]: Objetc; };
 ;interface Objest { [key :string]: string; };
 //;interface Objunc { [key :string]: string & Objetc; };
 //;interface Objust { [key :string]: string | Objetc; };
 
 /**/const globje :Objetc= (()=>{}).constructor('return this;')();
 /**/const envenv :Objest= /**/ (env as unknown as Objest)
 /**/                   || /**/ { 'globje': globje as unknown as string, };
 
 /**/const proces :Objetc= /**/ globje['process']
 /**/                   || /**/ { 'env':    envenv as unknown as Objetc,
 /**/                             'globje': globje,                      };
 
 const EV :Objest= {};
 const EVs_OK= ()=>{ return EV; };
 const EVs_DO= (pe= proces.env)=>{
   let X_SECRET= EV.X_SECRET; if (X_SECRET) {} else { X_SECRET=
     EV.X_SECRET = "" + pe['X_SECRET'];
     const l3= Math.floor((X_SECRET.length)/3);
     EV.A_SECRET = X_SECRET.slice(0, l3);
     EV.A_PRIKEY = "" + pe['A_PRIKEY'];
     EV.WIKI_API = 'https:'+'//shplatsh.miraheze.org/w/api.php'; // TODO= better
     EV.BOT_USER = "" + pe['BOT_USER'];
     EV.BOT_PASS = "" + pe['BOT_PASS'] + EV.A_SECRET;
   }
   return EV;
 };
 
 const EVs= ((()=>{ const not= !proces.env['globje'];
                    return not? (EVs_DO(), EVs_OK): EVs_DO; })());
 
 /** /const globje= (( ()=>{} ).constructor('return this;'))();
 /** /const proces= globje['process'] || { 'env': env };
 /// /
 /// /const A_SECRET = "" + proces.env['X_SECRET'];
 /** /const X_SECRET = "" + proces.env['X_SECRET'];
 /** /const A_PRIKEY = "" + proces.env['A_PRIKEY'];
 /// /
 /// /const WIKI_API = 'https:'+'//splats.miraheze.org/w/api.php';
 /** /const WIKI_API = 'https:'+'//shplatsh.miraheze.org/w/api.php'; // TODO= better
 /// /
 /** /const BOT_USER = "" + proces.env['BOT_USER'];
 /// /const BOT_PASS = "" + proces.env['BOT_PASS'] + A_SECRET.slice(0, A_SECRET.length-10);
 /** /const BOT_PASS = "" + proces.env['BOT_PASS'] + X_SECRET.slice(0, X_SECRET.length-10);
     /**/
 const always= true; always; // const never= false;
 //;interface _t_ { _: _t_ }; const _ :_t_= { _: (undefined as unknown as _t_), }; _._= _;
 ;interface AssociativeArray<RangeType> { [key :string]: RangeType; };
 
    /**\
 ;interface KVRecord {
  public_key    :string;
  page_matches  :string;
  expires_after :string; // DATE as ISO string
 }; /**/
 
    /**\
 ;interface KVNamespace {
  get(key :string)                 :Promise<string|null>;
  get<T>(key :string, fmt :'json') :Promise<T|null>;
  put(key :string, val :string)    :Promise<void>;
 }; /**/
 ;interface KVNamespace_Cf { KV :KVNamespace; };
 
    /**\
 ;interface DBRecord {
  public_key    :string;
  page_matches  :string;
  expires_after :string;
  key_residue   :number;
 }; /**/
 
 ///
 ;type Env1= AssociativeArray<string>;
 ;type Env2= AssociativeArray<string|KVNamespace>;
 
 ;type EnvKVN= AssociativeArray<KVNamespace>;
 ;type EnvKVS= KVNamespace_Cf & Env1;
 
 //;type EnvKV= Record<string, string> & { KV :KVNamespace; };
 //;type EnvKV= { KV :KVNamespace; } & Record<string, string>;
 //;type EnvKV= { KV :KVNamespace; } & AssociativeArray<string>;
 //;type EnvKV= { KV :KVNamespace; } & Env1;
 
 //;type Env1_equiv_out= Record<string, string>; // USE:- const kv= env['KV'] as unknown as KVNamespace;
 
 ;type Env= EnvKVS;
 
 ///
 
 ;interface Validate_t_ {
  secret  :string;
  residue :number;
  page    :string;
  text    :string;
 };
 
 async function validate(request :Request) :Promise<Validate_t_> {
  if (request.method !== 'POST') throw new Error('Method not allowed');
  let body :unknown;
  try { body= await request.json(); }
  catch { throw new Error('Invalid JSON'); }
 
  const { secret, residue, page, text }= body as Record<string, unknown>;
  if (typeof secret  !== 'string' || !secret)           throw new Error('Missing secret');
  if (typeof residue !== 'number')                      throw new Error('Missing residue');
  if (typeof page    !== 'string' || !page)             throw new Error('Missing page');
  if (typeof text    !== 'string' || !text)             throw new Error('Missing text');
  return { secret, residue, page, text };
 }
 /**\
 async function kvGetBySecret(secret :string, kv :KVNamespace) :Promise<KVRecord|null> {
  return kv.get<KVRecord>(`Ks:${secret}`, 'json');
 }
 
 async function kvGetByPublicKey(publicKey :string, kv :KVNamespace) :Promise<string|null> {
  return kv.get(`Ku:${publicKey}`);
 }
 
 async function kvStore(secret :string, record :KVRecord, kv :KVNamespace) :Promise<void> {
  return kv.put(`Ks:${secret}`, JSON.stringify(record));
 }
 
 async function kvStoreReverse(publicKey :string, secret :string, kv :KVNamespace) :Promise<void> {
  return kv.put(`Ku:${publicKey}`, secret);
 }
 /**/
 ///
 
 const emptyUint8Array= new Uint8Array(0);
 /**\                                      !Following is OK in TS15/16 but warns thereafter :-(
 ;type pepsel_t_= Uint8Array|string;
 function newTxtE(it :string) {
  return (new TextEncoder()).encode(it);
 }
 //const emptyArrayBuffer= new ArrayBuffer(0);
 
 function newHkdfParams(
           pep :pepsel_t_= "", sel :pepsel_t_= "", len :(number|string)= 256) {
  const pepsel= (it :pepsel_t_
           ) => (it? 'string' !== typeof it? it: newTxtE(it): emptyUint8Array);
  const pepper= pepsel(pep), salt= pepsel(sel);
  if ('number' !== typeof len) {} else len= 'SHA-' + len;
  const ret :HkdfParams= { name: 'HKDF', hash: len, salt, info: pepper, };
  return ret;
 }
 const hkdfKeyGen32= newHkdfParams("", "", 256); hkdfKeyGen32;
 /**/
 async function computeECDH(myPriKey :string, rqPubKey :string) { // :Promise<string|null>
  try {
    const prikey= await crypto.subtle.importKey('jwk', JSON.parse((myPriKey)),
                   { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveKey'] );
    const pubkey= await crypto.subtle.importKey('jwk', JSON.parse((rqPubKey)),
                   { name: 'ECDH', namedCurve: 'P-256' }, false, [           ] );
    const hkdfKeyGen32= { name: 'HKDF', hash: 'SHA-256',
                          salt: emptyUint8Array, info: emptyUint8Array };
 
    const sharedECDHKey= await crypto.subtle.deriveKey( { name: 'ECDH', public: pubkey },
                                               prikey, hkdfKeyGen32, false, ['deriveKey'] );
    const sharedHMACKey= await crypto.subtle.deriveKey( hkdfKeyGen32, sharedECDHKey,
                 { name: 'HMAC', hash: 'SHA-256', length: 512 }, true, ['sign', 'verify'] );
 
    const sharedKey_out= await crypto.subtle.deriveKey( { name: 'ECDH', public: pubkey }, prikey,
      { name: 'HMAC', hash: 'SHA-256', length: 256 }, true, ['sign', 'verify'] ); sharedKey_out;
 
    // export as JWK and return as base64 string for KV storage
    const exported= await crypto.subtle.exportKey('jwk', sharedHMACKey);
    if (exported && typeof exported === 'object') return (exported as JsonWebKey).k ?? null;
      } catch (e: unknown) { e; }
  return null;
 }
 
 ///
 /**\
 async function authentication_records(residue :number) :Promise<DBRecord[]> {
  const sbRes= await fetch(`${A_DB_URL}/rest/v1/clients`
    + `?key_residue=eq.${residue}&select=public_key,page_matches,expires_after`,           {
        headers: { 'apikey': A_DB_KEY, 'Authorization': `Bearer ${A_DB_KEY}` } } );
  if (!sbRes.ok) throw new Error('Database query failed');
  return sbRes.json();
 }
 
 const specimen_authrecord :DBRecord= {
  public_key: '{"crv":"P-256","ext":true,"key_ops":[],"kty":"EC",'
            + '"x":"KKKA0k2lk4QlCu_xLZ7LVMRnQ2Ng9Wioj7df5SQyYGc",'
            + '"y":"Kw5vvKu4TT_XQ3bq685FLxENJu3grXXW1mtn66fmWvM"}',
  page_matches: "^/Tmp/.*$", expires_after: "2034-04-23", key_residue: 1184, };
 
 async function authenticate(secret :string, residue :number, page :string, env :Env
                           ) :Promise<void> {
  // Step 1: Done on entry
  // Step 2: KV lookup by shared secret
  const hit = await kvGetBySecret(secret, env.KV);
  if (!hit) {} else {
    if (new Date(hit.expires_after) < new Date()) {
      throw new Error('Permission expired');      }
    if (!new RegExp(hit.page_matches).test(page)) {
      throw new Error('Page not permitted');      }
    return;         } // authenticated and authorised
  
  // Step 3: query Supabase by residue
  const records :DBRecord[]= (!!!always)? await authentication_records(residue):
                                          [ specimen_authrecord ];
  if (records.length === 0) throw new Error('Unauthorized');
 
  // Steps 4 & 5: iterate recordset
  for (const record of records) {
 
    // cheap checks first
    if (new Date(record.expires_on/*after/** /) <= new Date()) continue;
    if (!new RegExp(record.page_matches).test(page)) continue;
 
    // already ECDH'd this public key? reverse index lookup
    const cachedSecret = await kvGetByPublicKey(record.public_key, env.KV);
    if (cachedSecret !== null) continue; // ECDH already done, secret didn't match
 
    // compute ECDH — expensive, therefore last
    const derived = await computeECDH(A_PRIKEY, record.public_key);
    if (derived !== null) {} else throw new Error('Miscalculated');
 
 if (!!!always) {}                                        else {
    // populate both KV records regardless of match
    await kvStore(derived,                {
      public_key:    record.public_key,
      page_matches:  record.page_matches,
      expires_after: record.expires_after }, env.KV);
    await kvStoreReverse(record.public_key, derived, env.KV); }
 
    // does it match?
    if (derived === secret) return; // authorised
  }
  throw new Error('Unauthorised');
 }
 /**/
 ///
 
 /////
 
 if (! !always) {} else { const out= undefined as unknown as Env2|EnvKVN; out; }
 
 function qwik_residue(str :string, mod= 0) {
  const rv= str.split("").reduce((it, c)=>((it%32749<<16) + c.charCodeAt(0)), 0);
  return mod? rv%mod: rv;
 }
 
 console.log(""+qwik_residue(' '));
 
 /***\
   *
 function isJsonWebKey(it_ :object) {
  //if (!x || typeof x !== 'object') return false;
  // required JWK fields vary by key type; check common required fields:
  const it= it_ as JsonWebKey;
  const hasKty= typeof it.kty === 'string';
  const hasUseOrKeyOps= typeof it.use === 'string' || Array.isArray(it.key_ops);
  return hasKty && hasUseOrKeyOps;
 }
   *
 function getECkeyPromise(it__ :Promise<CryptoKey>|JsonWebKey|string, ECK_ir_ :EcKeyImportParams) {
  const it_= 'object' === typeof it__? it__: JSON.parse(it__) as JsonWebKey;
  const it :Promise<CryptoKey>= 'object' === typeof it_?        !isJsonWebKey(it_)?
                                                         it_ as Promise<CryptoKey>:
    crypto.subtle.importKey('jwk', it_ as JsonWebKey,
                         ECK_ir_, false, ['deriveKey']):
           (undefined as unknown as Promise<CryptoKey>);
  return it;
 }
   *
 /// Myst:- res 3 & res loop
   *
 LOST(?)= re CLLs:- < https://copilot.microsoft.com/shares/fc9tM8JjXFjMtrQTHFEJP >
   *
 \***/
 
 ;interface DBRecord {
  essence        :string;
  residue        :number;
  validto        :number;
  payload        :string;
  payload_rec   ?:object;
  ecdh_pubkey   ?:string;
  page_prefixes ?:string[];
  expires_on    ?:number;
 };
 
 function ccyymmToExpiry(validto :number) :number {
  const d= validto * 100 + 101;
  return d % 10000 !== 1301? d: d + 8800;
 }
 
 function arrayPrefixes(it_ :unknown) {
  const rv_= ("string" === typeof it_ && it_? " " + it_.trim(): "").split(" "); rv_.shift();
  const it=  rv_.shift();
  const rv= rv_.filter((s) => (s !== ""));
  
  if (it || it === "") rv.unshift(it); return rv;
 }
 
 function unpackDBRecord(dbrec :DBRecord) :DBRecord {
  try {
    const jrec= JSON.parse(dbrec.payload) as Record<string, unknown>;
 //    const it_= jrec.page_prefixes || "";
 //    const it = "string" === typeof it_ && it_? " " + it_.trim(): "";
 //    const pfxs_= it.split(" ").slice(1).filter((s, i) => (s !== "" || i === 0)); pfxs_; // TODO= better
    const pfxs= arrayPrefixes(jrec.page_prefixes || "");
    const exon= ccyymmToExpiry(dbrec.validto);
 
    return { ...dbrec,
      payload_rec:   jrec,
      ecdh_pubkey:   dbrec.essence, // TODO?= USE= json
      page_prefixes: pfxs,
      expires_on:    exon,
    };
  }
  catch (oops :unknown) {
    return { ...dbrec, threw: String(oops), } as DBRecord;
  }
 }
 
 ;interface KVSecretRecord {
  page_prefixes :string[];
  expires_on    :number;
 };
 
 async function kvGetBySecret(secret :string, kv :KVNamespace
                            ) :Promise<KVSecretRecord|null> {
  return kv.get<KVSecretRecord>("Ks7:" + secret, 'json');
 }
 
 async function kvGetByPublicKey(publicKey :string, kv :KVNamespace
                               ) :Promise<string|null> {
  return kv.get("Ku7:" + publicKey);
 }
 
 async function kvStore(secret :string, record :KVSecretRecord,
                       kv :KVNamespace) :Promise<void> {
  return kv.put("Ks7:" + secret, JSON.stringify(record));
 }
 
 async function kvStoreReverse(publicKey :string, secret :string,
                              kv :KVNamespace) :Promise<void> {
  return kv.put("Ku7:" + publicKey, secret);
 }
 
 async function authentication_records(residue :number, env :Env
                                     ) :Promise<DBRecord[]
 |undefined
                                               > {
  const now= currentCCYYMM();
  const res= await (env.D1 as unknown as D1Database).prepare(
    "SELECT essence, residue, validto, payload FROM essences" +
    " WHERE residue = ? AND validto >= ?"
  ).bind(residue, now).all<DBRecord>();
  return res.results;
 }
 
 function currentCCYYMM() :number {
  const d= new Date();
  return d.getFullYear() * 100 + (d.getMonth() + 1);
 }
 
 function currentCCYYMMDD() :number {
  const d= new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
 }
 
 const specimen_authrecord_= {
  essence:      '{"crv":"P-256","ext":true,"key_ops":[],"kty":"EC",'
              + '"x":"KKKA0k2lk4QlCu_xLZ7LVMRnQ2Ng9Wioj7df5SQyYGc",'
              + '"y":"Kw5vvKu4TT_XQ3bq685FLxENJu3grXXW1mtn66fmWvM"}',
  residue:      1184,
  validto:      203404,
  payload:      '{"page_prefixes":"/Tmp/ "}', /***
  payload_rec:  undefined,
  ecdh_pubkey   undefined,
  page_prefixes undefined,
  expires_on    undefined,                    /**/
 } //as DBRecord;
 
 const specimen_authrecord :DBRecord= specimen_authrecord_ /*** {
  essence:      '{"crv":"P-256","ext":true,"key_ops":[],"kty":"EC",'
              + '"x":"KKKA0k2lk4QlCu_xLZ7LVMRnQ2Ng9Wioj7df5SQyYGc",'
              + '"y":"Kw5vvKu4TT_XQ3bq685FLxENJu3grXXW1mtn66fmWvM"}',
  residue:      1184,
  validto:      203404,
  payload:      '{"page_prefixes":"/Tmp/ "}',
 } /**/ ;
 
 async function authenticate(secret :string, residue :number, page :string, env :Env
                           ) :Promise<void> {
  // Step 1: Done on entry
 
  // Step 2: KV lookup by shared secret
  const hit= await kvGetBySecret(secret, env.KV);
  if (!hit) {} else {
    if (hit.expires_on <= currentCCYYMMDD()) {
      throw new Error('Permission expired'); }
    if (!hit.page_prefixes.some(pfx => page.startsWith(pfx))) {
      throw new Error('Page not permitted');                  }
    return;         } // authenticated and authorised
 
  // Step 3: query D1 by residue
  const records :DBRecord[]= (! !always)? await authentication_records(residue, env) ?? []:
                                          [ specimen_authrecord ];
  if (records.length === 0) throw new Error('Unauthorized');
 
  // Steps 4 & 5: iterate recordset
  for (const record of records) {
    const rec= unpackDBRecord(record);
 
    // cheap checks first
    if ((rec.expires_on ?? 0) <= currentCCYYMMDD()) continue;
    if (!rec.page_prefixes?.some(pfx => page.startsWith(pfx))) continue;
 
    // already ECDH'd this public key? reverse index lookup
    const cachedSecret= await kvGetByPublicKey(rec.essence, env.KV);
    if (cachedSecret !== null) continue; // ECDH already done, secret didn't match
 
    // compute ECDH — expensive, therefore last
    const derived= await computeECDH(EV.A_PRIKEY, rec.essence);
    if (derived !== null) {} else throw new Error('Miscalculated'
 + " (" + (""+EV.A_PRIKEY).length + ", " + (""+rec.essence).length + ")"
                                                 );
 
 if (!!!always) {}                                   else {
    // populate both KV records regardless of match
    await kvStore(derived, {
      page_prefixes: rec.page_prefixes ?? [],
      expires_on:    rec.expires_on    ?? 0,  }, env.KV);
    await kvStoreReverse(rec.essence, derived, env.KV);   }
 
    // does it match?
    if (derived === secret) return; // authorised
  }
  throw new Error('Unauthorised');
 }
 
 //;interface shim_t__ {  };
 //;interface AssociativeArray<RangeType> { [key :string]: RangeType; };
 //type shim_t_= AssociativeArray<shim_t_&string>;
 type shim_t__<TermType>= AssociativeArray<shim_t__<TermType>&TermType>;
 type string_shim_t_= shim_t__<string>;
 
 async function appendToWiki(page :string, text :string) :Promise<Response> {
 
  const headers= {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent':   'tiny-butterfly/0.1'
  };
 
  // Step 1: fetch login token
  const loginTokenReq= (EV.WIKI_API + '?action=query&meta=tokens&type=login&format=json');
  const loginTokenRes= await fetch(loginTokenReq,    {
    headers: { 'User-Agent': headers['User-Agent'] } });
  if (loginTokenRes.ok) {} else throw new
    Error('Failed to fetch() login token with GET from < '+loginTokenReq+' >');//' :- ' + JSON.stringify(loginTokenRes));
  const loginTokenData = await loginTokenRes.json<string_shim_t_>();
  const loginToken = loginTokenData.query.tokens.logintoken;
  const cookies1 = loginTokenRes.headers.get('set-cookie') ?? "";
 
  // Step 2: log in
  const loginRes= await fetch(EV.WIKI_API, {
    method:  'POST',
    headers: { ...headers, 'Cookie': cookies1 },
    body: new URLSearchParams({
      action:     'login',
      lgname:     EV.BOT_USER,
      lgpassword: EV.BOT_PASS,
      lgtoken:    loginToken,
      format:     'json'      })            });
  if (!loginRes.ok) throw new Error('Failed to log in');
  const loginData= await loginRes.json<string_shim_t_>();
  if (loginData.login.result !== 'Success') {
    throw new Error(`Wiki login failed: ${loginData.login.result}`);
  }
  const cookies2= [cookies1, loginRes.headers.get('set-cookie')].filter(Boolean).join('; ');
 
  // Step 3: fetch edit token
  const editTokenRes= await fetch(`${EV.WIKI_API}?action=query&meta=tokens&format=json`,
                                  { headers: { ...headers, 'Cookie': cookies2 } });
  if (!editTokenRes.ok) throw new Error('Failed to fetch edit token');
  const editTokenData= await editTokenRes.json<string_shim_t_>();
  const editToken= editTokenData.query.tokens.csrftoken;
  const cookies3= [cookies2, editTokenRes.headers.get('set-cookie')].filter(Boolean).join('; ');
 
  // Step 4: append text
  const editRes= await fetch(EV.WIKI_API, {
    method: 'POST',
    headers: { ...headers, 'Cookie': cookies3 },
    body: new URLSearchParams({
      action:     'edit',
      title:      page,
      appendtext: '\n\n' + text,
      token:      editToken,
      format:     'json'      })           });
  if (!editRes.ok) throw new Error('Failed to append to wiki');
  const editData= await editRes.json<string_shim_t_>();
  if (editData.edit?.result !== 'Success') {
    throw new Error(`Wiki edit failed: ${JSON.stringify(editData)}`);
  }
  return new Response('OK', { status: 200 });
 }
 
 ///
 
 const worker_export_default= { //was: export default {
  async fetch(request :Request, env :Env) :Promise<Response> {
 
 ///if (                   EV.A_SECRET) {} else           throw new Error('Invalid PIN');
 
    const password= request.headers.get('X-Secret') ?? "";
    const PIN= password.slice(0, EV.A_SECRET.length);
 
    if (PIN === EV.A_SECRET) {} else {
     return new Response("Expired PIN", { status: 403 });
    } // TODO= USE= password
 
    let secret :string, residue :number, page :string, text :string;
 
    try { ({ secret, residue, page, text }= await validate(request)); }
    catch (e) { return new Response((e as Error).message, { status: 400 }); }
 
 ///if (      password === EV.X_SECRET) {} else           throw new Error('Expired password');
 
    try { await authenticate(secret, residue, (page.charAt(0)==='/'? "": "/") + page, env); }
    catch (e) { return new Response((e as Error).message, { status: 401 }); }
 
    try { return await appendToWiki(page.slice(page.charAt(0)==='/'? 1: 0), text); }
    catch (e) { return new Response((e as Error).message, { status: 500 }); }
  }
 };
 
 export async function onRequest(ctx :EventContext<Record<string, string>,
                                            any, Record<string, unknown>>) { EVs();
    return await worker_export_default.fetch(ctx.request, ctx.env/**\, ctx/**/ );   }
 
