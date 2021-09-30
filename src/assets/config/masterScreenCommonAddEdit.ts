import { isNull } from "@igniteui/material-icons-extended";

export const masteraddedit = [{
  master: [{
    channeltype: [{
      fieldprop: [{
        formcontrolname: "channeltypename",
        field: "channeltype",
        label: "Channel Type",
        type: "text",
        fieldtype: "string",
        api: "",
        required: "required",
        placeholder: "Enter Channel Type",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "channeltypedesc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "channeltypedesclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      }
      ], addApi: [
        {
          url: "channeltype",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "channeltype",
        method: "post",
        data: null,
        fieldprop:"channeltypeId"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    channel: [{
      fieldprop: [{
        formcontrolname: "channelname",
        field: "channel",
        label: "Channel",
        type: "text",
        fieldtype: "string",
        api: "",
        required: "required",
        placeholder: "Enter Channel",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "channeldesc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "channeldesclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "marketgrid",
        field: "marketIds",
        label: "Market",
        type: "grid",
        required: null,
        ddldata:null,
        api:"Market/ddl",
        griddatafield:"marketGridData",
        columndata:[{ field:"id", title:"ID", width: "150px", height: "10px", type: "string", pinned: true, hidden: true },
        { field:"description", title:"Market", width: "150px", height: "10px", type: "string", pinned: true, hidden: false },
        { field:"description2", title:"Description", width: "150px", height: "10px", type: "string", pinned: true, hidden: false }]
      }, {
        formcontrolname: "channeltypegrid",
        field: "channeltypeIds",
        label: "Channel Type",
        type: "grid",
        required: null,
        ddldata:null,
        api:"Channeltype/ddl",
        griddatafield:"channeltypeGridData",
        columndata:[{ field:"id", title:"ID", width: "150px", height: "10px", type: "string", pinned: true, hidden: true },
        { field:"description", title:"Channel Type", width: "150px", height: "10px", type: "string", pinned: true, hidden: false },
        { field:"description2", title:"Description", width: "150px", height: "10px", type: "string", pinned: true, hidden: false }]
      }],addApi: [
        {
          url: "channel",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "channel",
        method: "post",
        data: null,
        fieldprop:"channelId"
      }],
      gridApi:[{
        channeltype:{
          url: "Channeltype/ddl",
        method: "get",
        data: null,
        field:[{name:"id",flag:"true",type:"string"},
        {name:"description",flag:"true",type:"string"},
        {name:"description2",flag:"true",type:"string"}]
        },
        market:{
          url: "market/ddl",
        method: "get",
        data: null,
        field:[{name:"id",flag:"true",type:"string"},
        {name:"description",flag:"true",type:"string"},
        {name:"description2",flag:"true",type:"string"}]
        }
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    cabinets: [{
      fieldprop: [{
        formcontrolname: "cabinetsname",
        field: "cabinet",
        label: "Cabinets",
        type: "text",
        fieldtype: "string",
        api: "",
        required: "required",
        placeholder: "Enter Cabinets",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "cabinetsdesc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "cabinetsdesclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],addApi: [
        {
          url: "cabinet",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "cabinet",
        method: "post",
        data: null,
        fieldprop:"cabinetId"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    devefforttype: [{
      fieldprop: [{
        formcontrolname: "devefforttypename",
        field: "devefforttype",
        label: "Dev Effort Type",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Dev Effort Type",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devefforttypedesc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devefforttypedesclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ], addApi: [
        {
          url: "devefforttype",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "devefforttype",
        method: "post",
        data: null,
        fieldprop:"devefforttypeId"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    devcomplexity: [{
      fieldprop: [{
        formcontrolname: "devcomplexityname",
        field: "devcomplexity",
        label: "Dev Complexity",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Dev Complexity",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devcomplexitydesc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devcomplexitydesclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ], addApi: [
        {
          url: "devcomplexity",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "devcomplexity",
        method: "post",
        data: null,
        fieldprop:"devcomplexityId"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    gravity: [{
      fieldprop: [{
        formcontrolname: "gravityname",
        field: "gravity",
        label: "Gravity",
        type: "text",
        fieldtype: "string",
        api: "",
        required: "required",
        placeholder: "Enter Gravity",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "gravitydesc",
        field:"description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "gravitydesclong",
        field:"descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "gravitylistseq",
        field: "listseq",
        label: "List Sequence",
        fieldtype:"number",
        type: "text",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },{
        formcontrolname: "gravityisactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype:"boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ], addApi: [
        {
          url: "gravity",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "gravity",
        method: "post",
        data: null,
        fieldprop:"gravityId"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    devtype1: [{
      fieldprop: [{
        formcontrolname: "devtype1name",
        label: "Dev Type1",
        type: "text",
        api: "",
        required: "required",
        placeholder: "Enter Dev Type1",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devtype1desc",
        label: "Description",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devtype1desclong",
        label: "Description Long",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      }
      ],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    devtype2: [{
      fieldprop: [{
        formcontrolname: "devtype2name",
        label: "Dev Type2/Class",
        type: "text",
        api: "",
        required: "required",
        placeholder: "Enter Dev Type2/Class",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devtype2desc",
        label: "Description",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devtype2desclong",
        label: "Description Long",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "devtype1",
        label: "Dev Type 1",
        type: "select",
        api: "assets/config/pool.json",
        apidata: "",
        required: "required",
        placeholder: "Select Dev Type1",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    market: [{
      fieldprop: [{
        formcontrolname: "marketname",
        field: "market",
        label: "Market",
        type: "text",
        fieldtype: "string",
        api: "",
        required: "required",
        placeholder: "Enter Market",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "marketdesc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "marketdesclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "pool",
        field: "poolId",
        label: "Pool",
        type: "select",
        fieldtype: "number",
        api: "Pool/ddl",
        apidata: "",
        required: "required",
        placeholder: "Select Pool",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },
      {
        formcontrolname: "region",
        field: "regionId",
        label: "Region",
        type: "select",
        fieldtype: "number",
        api: "Region/ddl",
        apidata: "",
        required: "required",
        placeholder: "Select Region",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },
      {
        formcontrolname: "gravity",
        field: "gravityId",
        label: "Gravity",
        type: "select",
        fieldtype: "number",
        api: "Gravity/ddl",
        apidata: "",
        required: "required",
        placeholder: "Select Gravity",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },
      {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "number",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "avgapprvdelayname",
        field: "avgApprdelay",
        label: "Avg Apprv Delay",
        type: "text",
        fieldtype: "number",
        api: "",
        required: null,
        placeholder: "Enter Avg Apprv Delay",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devtype",
        field: "defDevtype2Id",
        label: "Dev Type ???",
        type: "select",
        fieldtype: "number",
        api: "DevType2/ddl",
        apidata: "",
        required: null,
        placeholder: "Select Dev Type",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },{
        formcontrolname: "reptonlyname",
        field: "reptonly",
        label: "Report Only",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },
      {
        formcontrolname: "adddeveffortdaysname",
        field: "adddeveffortdays",
        label: "Add Dev Effort Days",
        type: "text",
        fieldtype: "number",
        api: "",
        required: null,
        placeholder: "Enter Add Dev Effort Days",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "phasingplanitem",
        field: "phasingplanitem",
        label: "Phasing Plan Item",
        type: "text",
        fieldtype: "number",
        api: "",
        required: null,
        placeholder: "Enter Phasing Plan Item",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],
      addApi: [
        {
          url: "market",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "market",
        method: "post",
        data: null,
        fieldprop:"marketId"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    region: [{
      fieldprop: [{
        formcontrolname: "region",
        field: "region",
        label: "Region",
        type: "text",
        fieldtype: "string",
        api: "",
        required: "required",
        placeholder: "Enter Market",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "description",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "descrLong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "listseq",
        field: "lisetseq",
        label: "List Sequence",
        fieldtype:"number",
        type: "text",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },{
        formcontrolname: "isactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype:"boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ], addApi: [
        {
          url: "region",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "region",
        method: "post",
        data: null,
        fieldprop:"regionId"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    studio: [{
      fieldprop: [{
        formcontrolname: "studioname",
        label: "Studio",
        type: "text",
        api: "",
        required: "required",
        placeholder: "Enter Studio",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "studiodesc",
        label: "Description",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "studiodesclong",
        label: "Description Long",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "studioheadowner",
        label: "Studio Head/Owner",
        type: "select",
        api: "assets/config/pool.json",
        apidata: "",
        required: "required",
        placeholder: "Select Studio Head/Owner",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false,
        innercontrol: [{
          formcontrolname: "studioheadownerlblname",
          label: "34232436",
          type: "label",
          api: "",
          required: "",
          placeholder: "",
          action: "",
          pipe: ""
        }]
      },
      {
        formcontrolname: "pmolead",
        label: "PMO Lead",
        type: "select",
        api: "assets/config/pool.json",
        apidata: "",
        required: "required",
        placeholder: "Select PMO Lead",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false,
        innercontrol: [{
          formcontrolname: "pmoleadlblname",
          label: "45632",
          type: "label",
          api: "",
          required: "",
          placeholder: "",
          action: "",
          pipe: ""
        }]
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }, {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      }
      ],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    quarter: [{
      fieldprop: [{
        formcontrolname: "quartername",
        label: "Quarter",
        type: "text",
        api: "",
        required: "required",
        placeholder: "Enter Quarter",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "quarterdesc",
        label: "Description",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "devtype1desclong",
        label: "Description Long",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "startmonth",
        label: "Start Month",
        type: "select",
        api: "assets/config/month.json",
        apidata: "",
        required: "required",
        placeholder: "Select Start Month",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }, {
        formcontrolname: "endmonth",
        label: "End Month",
        type: "select",
        api: "assets/config/month.json",
        apidata: "",
        required: "required",
        placeholder: "Select End Month",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }, {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      }
      ],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    version: [{
      fieldprop: [{
        formcontrolname: "versionname",
        label: "Version",
        type: "text",
        api: "",
        required: "required",
        placeholder: "Enter Channel Type",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "versiondesc",
        label: "Description",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "versiondesclong",
        label: "Description Long",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      }
      ],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    status1: [{
      fieldprop: [{
        formcontrolname: "status1name",
        field: "status1",
        label: "Status1",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Status1",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "status1desc",
        field: "description",
        label: "Description",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "status1desclong",
        field: "descrLong",
        label: "Status1",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "status1includeplan",
        field: "includeplan",
        label: "Include Plan",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Include Plan",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],
      addApi: [
        {
          url: "status1",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "status1",
        method: "post",
        data: null,
        fieldprop:"status1Id"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    status2: [{
      fieldprop: [{
        formcontrolname: "status2name",
        field: "status2",
        label: "Status2",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Status2",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "status2desc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "status2desclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "status1",
        field: "status1Id",
        label: "Status1",
        type: "select",
        fieldtype: "number",
        api: "status1/ddl",
        apidata: "",
        required: "required",
        placeholder: "Select Status1",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },{
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],
      addApi: [
        {
          url: "status2",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "status2",
        method: "post",
        data: null,
        fieldprop:"status2Id"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    status3: [{
      fieldprop: [{
        formcontrolname: "status3name",
        field: "status3",
        label: "Status3",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Status3",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "status3desc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "status3desclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "status2",
        field: "status2Id",
        label: "Status2",
        type: "select",
        fieldtype: "number",
        api: "status2/ddl",
        apidata: "",
        required: "required",
        placeholder: "Select Status2",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },{
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],
      addApi: [
        {
          url: "status3",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "status3",
        method: "post",
        data: null,
        fieldprop:"status3Id"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    prodcat1: [{
      fieldprop: [{
        formcontrolname: "prodcat1name",
        field: "prodcat1",
        label: "Prodcat1",
        type: "text",
        fieldtype: "string",
        api: "",
        required: "required",
        placeholder: "Enter Channel Type",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "prodcat1desc",
        field: "description",
        label: "Description",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "prodcat1desclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],addApi: [
        {
          url: "prodcat1",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "prodcat1",
        method: "post",
        data: null,
        fieldprop:"prodcat1Id"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    prodcat2: [{
      fieldprop: [{
        formcontrolname: "prodcat2name",
        field: "prodcat2",
        label: "Prodcat2",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Prodcat2",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "prodcat2desc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "prodcat2desclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "prodcat1",
        field: "prodcat1Id",
        label: "Prodcat1",
        type: "select",
        fieldtype: "number",
        api: "prodcat1/ddl",
        apidata: "",
        required: "required",
        placeholder: "Select Prodcat1",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },{
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],
      addApi: [
        {
          url: "prodcat2",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "prodcat2",
        method: "post",
        data: null,
        fieldprop:"prodcat2Id"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    prodcat3: [{
      fieldprop: [{
        formcontrolname: "prodcat3name",
        field: "prodcat3",
        label: "Prodcat3",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Prodcat3",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "prodcat3desc",
        field: "description",
        label: "Description",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "prodcat3desclong",
        field: "descrLong",
        label: "Description Long",
        type: "textarea",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "prodcat2",
        field: "prodcat2Id",
        label: "Prodcat2",
        type: "select",
        fieldtype: "number",
        api: "prodcat2/ddl",
        apidata: "",
        required: "required",
        placeholder: "Select Prodcat2",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },
      {
        formcontrolname: "devefforttype",
        field: "devefforttypeId",
        label: "Dev Efforts Type",
        type: "select",
        fieldtype: "number",
        api: "devefforttype/ddl",
        apidata: "",
        required: "required",
        placeholder: "Select Dev Efforts Type",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },
      {
        formcontrolname: "devcomplexity",
        field: "devcomplexityId",
        label: "Devcomplexity",
        type: "select",
        fieldtype: "number",
        api: "devcomplexity/ddl",
        apidata: "",
        required: "required",
        placeholder: "Select Devcomplexity",
        action: "",
        pipe: "",
        bindname: "description",
        bindvalue:"id",
        clearable: false,
        virtualScroll: true,
        multiple: false
      },{
        formcontrolname: "listsequencename",
        field: "listseq",
        label: "List Sequence",
        type: "text",
        fieldtype: "string",
        api: "",
        required: null,
        placeholder: "Enter List Sequence",
        action: "",
        pipe: ""
      },{
        formcontrolname: "chkactive",
        field: "isactive",
        label: "IsActive",
        type: "checkbox",
        fieldtype: "boolean",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Active",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],
      addApi: [
        {
          url: "prodcat3",
          method: "post",
          data: null
        }
      ],
      editApi:[{
        url: "prodcat3",
        method: "post",
        data: null,
        fieldprop:"prodcat3Id"
      }],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }],
    epp: [{
      fieldprop: [{
        formcontrolname: "eppname",
        label: "EPP Ref",
        type: "text",
        api: "",
        required: "required",
        placeholder: "Enter EPP Ref",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "eppdesc",
        label: "Description",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description",
        action: "",
        pipe: ""
      },
      {
        formcontrolname: "eppdesclong",
        label: "Description Long",
        type: "textarea",
        api: "",
        required: null,
        placeholder: "Enter Description Long",
        action: "",
        pipe: ""
      }, {
        formcontrolname: "version",
        label: "Version",
        type: "select",
        api: "assets/config/pool.json",
        apidata: "",
        required: null,
        placeholder: "Select Version",
        action: "",
        pipe: "",
        bindname: "name",
        clearable: false,
        virtualScroll: true,
        multiple: false
      }
      ],
      api: [{
        api: "assets/config/grid-data.json",
        apidata: "",
        url: "",
        param: [{}]
      }]
    }]
  }]
}]
