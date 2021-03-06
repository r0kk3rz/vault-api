import * as vault from '../src/index.js'
import * as wallet from '../src/wallet_api'

const WETH_ADDRESS = "0xd0A1E359811322d97991E03f863a0C30C2cF029C"
const ZIPT_ADDRESS = "0x374FaBa19192a123Fbb0c3990e3EeDcFeeaad42A"
const SNOUT_ADDRESS = "0x236425d1CD5dc250AdAdd1405871f1f285347F01"
const FANT_ADDRESS = "0x5A32259f5661207935d031C9d5a59571F70B9252"

describe('Wallet API', function() {

    describe('Wallet Init', function() {
        it('initialise', function(done) {
            wallet.walletInit(vault).then(() => {
                done();
            }).catch((error) => {
                done(error)
            })
        })
    })

    describe('Get Token Account', function() {
        [   
            ZIPT_ADDRESS,
            WETH_ADDRESS,          
        ].forEach(function(token_addr) {
            it('getAccountForToken', function(done) {
                wallet.getAccountForToken(vault, token_addr).then((address) => {
                    chai.expect(address).to.be.a('string')
                    done();
                }).catch((error) => {
                    done(error)
                })
            })
        })
    })

    describe('Get Token Balance', function() {
        [
            ZIPT_ADDRESS,
            WETH_ADDRESS
        ].forEach(function(token_addr) {
            it('getTokenBalance', function(done) {
                wallet.getTokenBalance(vault, token_addr).then((balance) => {
                    chai.expect(balance).to.be.a('string')
                    done()
                }).catch((error) => {
                    done(error)
                })
            })
        })
    })

    describe('Get Payment Info', function() {
        ["d2916cdf34344b4198c374e4aaeed9797caaa18366112ffbf20dcd80edb46224,428ab13acbad47c8bd648d0f31ff90aa286fe6687fd5c604a4b699184cedfb3d"
        ].forEach(function(hash) {
            it('getPaymentInfo', function(done) {
                wallet.getPaymentInfo(vault, hash).then((check_info) => {
                    chai.expect(check_info).to.be.an('object')
                    chai.expect(check_info).to.have.all.keys('check', 'multisigAccount')
                    console.info("check obj", check_info.check)
                    chai.expect(check_info.check).to.have.all.keys('amount', 'message', "r1", "s1", "v1", 'verificationKey')
                    chai.expect(check_info.multisigAccount).to.have.all.keys("accountAddress", "approveTx", "contractAddress", "m", "r0", "s0", "signerAddress", "tokenAddress", "v0")
                    done()
                }).catch((error) => {
                    done(error)
                })
            })
        })
    })
})