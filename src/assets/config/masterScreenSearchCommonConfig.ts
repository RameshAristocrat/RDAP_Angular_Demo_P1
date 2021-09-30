export const configJsonData = [
    {
      master: [
        {
          studio: [
            {
              fieldprop: [
                {
                  formcontrolname:"studioname",
                  label:"Studio",
                  field:"Studio",
                  type:"text",
                  api:"",
                  required:"required",
                  placeholder:"Enter Studio",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"studionamesrccriteria"
                  }
                },
                {
                  formcontrolname:"studiodesc",
                  label:"Description",
                  field:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"studiodescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"studio/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          market: [
            {
              fieldprop: [
                {
                  formcontrolname:"marketname",
                  label:"Market",
                  field:"Market",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Market",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"marketnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"marketdesc",
                  label:"Description",
                  field:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"marketdescsrccriteria"
                  }
                },
                {
                  formcontrolname:"pool",
                  label:"Pool",
                  field:"Pool",
                  type:"select",
                  api:"Pool/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Pool",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"poolsrccriteria"
                  }
                },
                {
                  formcontrolname:"region",
                  label:"Region",
                  field:"Region",
                  type:"select",
                  api:"Region/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Region",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"regionsrccriteria"
                  }
                },
                {
                  formcontrolname:"gravity",
                  label:"Gravity",
                  field:"Gravity",
                  type:"select",
                  api:"Gravity/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Gravity",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"gravitysrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"market/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          version: [
            {
              fieldprop: [
                {
                  formcontrolname:"versionname",
                  label:"Version Setup",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Version",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"versionnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"versiondesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"versiondescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"version/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          EPP: [
            {
              fieldprop: [
                {
                  formcontrolname:"eppname",
                  label:"EPP Ref",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter EPP Ref",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"eppnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"eppdesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"eppdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"epp/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          gravity: [
            {
              fieldprop: [
                {
                  formcontrolname:"gravityname",
                  field:"Gravity",
                  label:"Gravity",
                  type:"text",
                  api:"",
                  required:false,
                  placeholder:"Enter Gravity",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"gravitynamesrccriteria"
                  }
                },
                {
                  formcontrolname:"gravitydesc",
                  field:"Description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"gravitydescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"gravity/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          region: [
            {
              fieldprop: [
                {
                  formcontrolname:"regionname",
                  field:"Region",
                  label:"Region",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Region",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"regionnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"regiondesc",
                  field:"Description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"regiondescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"region/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          pool: [
            {
              fieldprop: [
                {
                  formcontrolname:"poolname",
                  label:"Pool",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Pool",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"pooldesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
                }
              ],
              searchApi: [
                {
                  url:"pool/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          devtype1: [
            {
              fieldprop: [
                {
                  formcontrolname:"devtype1name",
                  label:"Dev Type1",
                  type:"text",
                  api:"",
                  required:"required",
                  placeholder:"Enter Dev Type1",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"devtype1desc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
                }
              ],
              searchApi: [
                {
                  url:"devtype1/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          devtype2: [
            {
              fieldprop: [
                {
                  formcontrolname:"devtype2name",
                  label:"Dev Type2 / Class",
                  type:"text",
                  api:"",
                  required:"required",
                  placeholder:"Enter Dev Type2",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"devtype2desc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"devtype1",
                  label:"Dev Type 1",
                  type:"select",
                  api:"assets/config/pool.json",
                  apidata:"",
                  required:"required",
                  placeholder:"Select Dev Type1",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false
                }
              ],
              searchApi: [
                {
                  url:"devtype2/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          channeltype: [
            {
              fieldprop: [
                {
                  formcontrolname:"channeltypename",
                  label:"Channel Type",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Channel Type",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"channeltypenamesrccriteria"
                  }
                },
                {
                  formcontrolname:"channeltypedesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"channeltypedescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"channeltype/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          cabinets: [
            {
              fieldprop: [
                {
                  formcontrolname:"cabinetsname",
                  label:"Cabinets",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Cabinets",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"cabinetsnamesrccriteria"
                  }
                },
                {
                  formcontrolname:"cabinetsdesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"cabinetsdescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"Cabinet/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          channel: [
            {
              fieldprop: [
                {
                  formcontrolname:"channelname",
                  field:"channel",
                  label:"Channel",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Channel",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"channelsrccriteria"
                  }
                },
                {
                  formcontrolname:"channeldesc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"channeldescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"channel/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          devefforttype: [
            {
              fieldprop: [
                {
                  formcontrolname:"devefforttypename",
                  label:"Dev Effort Type",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Dev Effort Type",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"devefforttypenamesrccriteria"
                  }
                },
                {
                  formcontrolname:"devefforttypedesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"devefforttypedescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"devefforttype/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          devcomplexity: [
            {
              fieldprop: [
                {
                  formcontrolname:"devcomplexityname",
                  label:"Dev Complexity",
                  type:"text",
                  api:"",
                  required:null,
                  placeholder:"Enter Dev Complexity",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"devcomplexitynamesrccriteria"
                  }
                },
                {
                  formcontrolname:"devcomplexitydesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"devcomplexitydescsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"devcomplexity/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          quarter: [
            {
              fieldprop: [
                {
                  formcontrolname:"quartername",
                  label:"Quarter",
                  type:"text",
                  api:"",
                  required:"required",
                  placeholder:"Enter Quarter",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"quarterdesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
                }
              ],
              searchApi: [
                {
                  url:"quarter/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          status1: [
            {
              fieldprop: [
                {
                  formcontrolname:"status1name",
                  field:"status1",
                  label:"Status1",
                  type:"text",
                  api:"",
                  required:"null",
                  placeholder:"Enter Status1",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status1namesrccriteria"
                  }
                },
                {
                  formcontrolname:"status1desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status1descsrccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"status1/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          status2: [
            {
              fieldprop: [
                {
                  formcontrolname:"status2name",
                  field:"status2",
                  label:"Status2",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Status2",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status2namesrccriteria"
                  }
                },
                {
                  formcontrolname:"status2desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status2descsrccriteria"
                  }
                },{
                  formcontrolname:"status1",
                  label:"Status1",
                  field:"status1",
                  type:"select",
                  api:"Status1/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Status1",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"status1srccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"status2/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          status3: [
            {
              fieldprop: [
                {
                  formcontrolname:"status3name",
                  field:"status3",
                  label:"Status3",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Status3",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status3namesrccriteria"
                  }
                },
                {
                  formcontrolname:"status3desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"status3descsrccriteria"
                  }
                },{
                  formcontrolname:"status2",
                  label:"Status2",
                  field:"status2",
                  type:"select",
                  api:"Status2/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Status2",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"status2srccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"status3/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          prodcat1: [
            {
              fieldprop: [
                {
                  formcontrolname:"prodcat1name",
                  field:"prodcat1",
                  label:"Prodcat1",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Prodcat1",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat1namesrccriteria"
                  }
                },
                {
                  formcontrolname:"prodcat1desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat1descsrccriteria"
                  }
                }
              ],searchApi: [
                {
                  url:"prodcat1/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          prodcat2: [
            {
              fieldprop: [
                {
                  formcontrolname:"prodcat2name",
                  field:"prodcat2",
                  label:"Prodcat2",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Prodcat2",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat2namesrccriteria"
                  }
                },
                {
                  formcontrolname:"prodcat2desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat2descsrccriteria"
                  }
                },{
                  formcontrolname:"prodcat1",
                  label:"Prodcat1",
                  field:"prodcat1",
                  type:"select",
                  api:"Prodcat1/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select Prodcat1",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"prodcat1srccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"prodcat2/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ],
          prodcat3: [
            {
              fieldprop: [
                {
                  formcontrolname:"prodcat3name",
                  field:"prodcat3",
                  label:"Prodcat3",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Prodcat3",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat3namesrccriteria"
                  }
                },
                {
                  formcontrolname:"prodcat3desc",
                  field:"description",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:"",
                  searchcriteria:
                  {
                    formcontrolname:"prodcat3descsrccriteria"
                  }
                },{
                  formcontrolname:"prodcat2",
                  label:"Prodcat2",
                  field:"prodcat2",
                  type:"select",
                  api:"prodcat2/ddl",
                  apidata:"",
                  required: null,
                  placeholder:"Select prodcat2",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false,
                  searchcriteria:
                  {
                    formcontrolname:"prodcat2srccriteria"
                  }
                }
              ],
              searchApi: [
                {
                  url:"prodcat3/search",
                  method:"post",
                  data: null
                }
              ],
              api: [
                {
                  api:"assets/config/grid-data.json",
                  apidata:"",
                  url:"",
                  param: [
                    {}
                  ]
                }
              ]
            }
          ]
        }
      ],
      transaction: [
        {}
      ]
    }
  ]