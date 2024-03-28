export const LiquidityBootstrapPoolABI = [
  {
    inputs: [],
    name: 'AmountInTooLarge',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AmountOutTooLarge',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AssetsInExceeded',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CallerDisallowed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ClosingDisallowed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EnforcedPause',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EnforcedRedeemNotOpen',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoSharesToRedeem',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RecipientNotSender',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RedeemingDisallowed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ReentrancyGuardReentrantCall',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SellingDisallowed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SharesOutExceeded',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SlippageExceeded',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TotalFeeTooLarge',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TradingDisallowed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'WhitelistProof',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroAmount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'swapFee',
        type: 'uint256',
      },
    ],
    name: 'Buy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'platformFees',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'swapFeesAsset',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'swapFeesShare',
        type: 'uint256',
      },
    ],
    name: 'Close',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'streamID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    name: 'Redeem',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    name: 'RedeemOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'swapFee',
        type: 'uint256',
      },
    ],
    name: 'Sell',
    type: 'event',
  },
  {
    inputs: [],
    name: 'args',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'share',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'assets',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'virtualAssets',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'virtualShares',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'weightStart',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'weightEnd',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'saleStart',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'saleEnd',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalPurchased',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxSharePrice',
            type: 'uint256',
          },
        ],
        internalType: 'struct Pool',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'asset',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'close',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'closed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'emergencyWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxSharePrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxTotalAssetsIn',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxTotalSharesOut',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platform',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platformFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256',
      },
    ],
    name: 'previewAssetsIn',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sharesIn',
        type: 'uint256',
      },
    ],
    name: 'previewAssetsOut',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsOut',
        type: 'uint256',
      },
    ],
    name: 'previewSharesIn',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharesIn',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256',
      },
    ],
    name: 'previewSharesOut',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'purchasedShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'receivedShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'referred',
        type: 'bool',
      },
    ],
    name: 'redeem',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'redeemOpen',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'referredAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'referrerFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reservesAndWeights',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetReserve',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'shareReserve',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'assetWeight',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'shareWeight',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'saleEnd',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'saleStart',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sellingAllowed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'share',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxAssetsIn',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'swapAssetsForExactShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxAssetsIn',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'swapAssetsForExactShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxAssetsIn',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
    ],
    name: 'swapAssetsForExactShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minSharesOut',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'swapExactAssetsForShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minSharesOut',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
    ],
    name: 'swapExactAssetsForShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minSharesOut',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'swapExactAssetsForShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sharesIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAssetsOut',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'swapExactSharesForAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sharesIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAssetsOut',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'swapExactSharesForAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'swapFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxSharesIn',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'swapSharesForExactAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharesIn',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxSharesIn',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'swapSharesForExactAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharesIn',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'togglePause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'toggleRedeemOpen',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalPurchased',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalReferred',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSwapFeesAsset',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSwapFeesShare',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vestCliff',
    outputs: [
      {
        internalType: 'uint40',
        name: '',
        type: 'uint40',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vestEnd',
    outputs: [
      {
        internalType: 'uint40',
        name: '',
        type: 'uint40',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vestShares',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'virtualAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'virtualShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'weightEnd',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'weightStart',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'whitelistMerkleRoot',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'whitelisted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'withdrawalFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
