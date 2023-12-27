const {
  Address,
  PScriptContext,
  PPubKeyHash,
  PaymentCredentials,
  Script,
  bool,
  compile,
  data,
  makeValidator,
  pBool,
  pfn,
} = require("@harmoniclabs/plu-ts");

const stakePoolPluts = pfn(
  [data, data, PScriptContext.type],
  bool
)((owner, redeemer, ctx) => {
  // M.I.T License
  // 1. Function returns true so anyone can deposit

  // 2. Withdrawal logic pending...
  // const signedByOwner = ctx.tx.signatories.some(owner.eqTerm);

  return pBool(true);
});

///////////////////////////////////////////////////////////////////
// ------------------------------------------------------------- //
// ------------------------- utilities ------------------------- //
// ------------------------------------------------------------- //
///////////////////////////////////////////////////////////////////

const untypedValidator = makeValidator(stakePoolPluts);

const compiledContract = compile(untypedValidator);

export const contract = new Script("PlutusScriptV2", compiledContract);

export const scriptAddr = new Address(
  "mainnet",
  PaymentCredentials.script(contract.hash)
);
