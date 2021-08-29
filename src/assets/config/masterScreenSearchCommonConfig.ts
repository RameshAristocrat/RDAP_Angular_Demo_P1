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
                  url:"Studio/search",
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
                  label:"Gravity",
                  type:"text",
                  api:"",
                  required:"required",
                  placeholder:"Enter Gravity",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"gravitydesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
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
                  required:"required",
                  placeholder:"Enter Channel Type",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"channeltypedesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
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
                  required:"required",
                  placeholder:"Enter Cabinets",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"cabinetsdesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
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
                  label:"Channel",
                  type:"text",
                  api:"",
                  required:"required",
                  placeholder:"Enter Channel",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"channeldesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
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
                  required:"required",
                  placeholder:"Enter Dev Effort Type",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"devefforttypedesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
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
                  required:"required",
                  placeholder:"Enter Dev Complexity",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"devcomplexitydesc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
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
                  label:"Status1",
                  type:"text",
                  api:"",
                  required:"null",
                  placeholder:"Enter Status1",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"status1desc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
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
                  label:"Status2",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Status2",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"status2desc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"status1",
                  label:"Status1",
                  type:"select",
                  api:"assets/config/pool.json",
                  apidata:"",
                  required:"required",
                  placeholder:"Select Status1",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false
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
                  label:"Status3",
                  type:"text",
                  api:"",
                  required: null,
                  placeholder:"Enter Status3",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"status3desc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: null,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"status2",
                  label:"Status2",
                  type:"select",
                  api:"assets/config/pool.json",
                  apidata:"",
                  required: null,
                  placeholder:"Select Status2",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false
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
                  label:"Prodcat1",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Prodcat1",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"prodcat1desc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
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
                  label:"Prodcat2",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Prodcat2",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"prodcat2desc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"prodcat1",
                  label:"Prodcat1",
                  type:"select",
                  api:"assets/config/pool.json",
                  apidata:"",
                  required: null,
                  placeholder:"Select Prodcat1",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false
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
                  label:"Prodcat3",
                  type:"text",
                  api:"",
                  required: false,
                  placeholder:"Enter Prodcat3",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"prodcat3desc",
                  label:"Description",
                  type:"textarea",
                  api:"",
                  required: false,
                  placeholder:"Enter Description",
                  action:"",
                  pipe:""
                },
                {
                  formcontrolname:"prodcat2",
                  label:"Prodcat2",
                  type:"select",
                  api:"assets/config/pool.json",
                  apidata:"",
                  required: null,
                  placeholder:"Select Prodcat2",
                  action:"",
                  pipe:"",
                  bindname:"name",
                  clearable: false,
                  virtualScroll: true,
                  multiple: false
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