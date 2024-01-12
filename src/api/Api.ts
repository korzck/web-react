/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GormDeletedAt {
  time?: string;
  /** Valid is true if Time is not NULL */
  valid?: boolean;
}

export interface WebInternalModelsImageSwagger {
  error?: string;
  link?: string;
}

export interface WebInternalModelsItem {
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  id?: number;
  imgurl?: string;
  info?: string;
  price?: string;
  subtitle?: string;
  title?: string;
  type?: string;
  updatedAt?: string;
  url?: string;
}

export interface WebInternalModelsItemCommentSwagger {
  comment?: string;
  item_id?: number;
}

export interface WebInternalModelsItemInOrderSwagger {
  comment?: string;
  id?: number;
  item?: WebInternalModelsItem;
  quantity?: number;
}

export interface WebInternalModelsItemModel {
  id?: number;
  imgurl?: string;
  info?: string;
  price?: string;
  subtitle?: string;
  title?: string;
  type?: string;
  url?: string;
}

export interface WebInternalModelsItemPrototype {
  imgurl?: string;
  info?: string;
  price?: string;
  subtitle?: string;
  title?: string;
  type?: string;
  url?: string;
}

export interface WebInternalModelsItemsSwagger {
  items?: WebInternalModelsItem[];
  length?: number;
  order_id?: number;
  page_size?: number;
}

export interface WebInternalModelsOrder {
  admin_id?: number;
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  email?: string;
  id?: number;
  status?: string;
  updatedAt?: string;
  user?: WebInternalModelsUser;
  user_id?: number;
}

export interface WebInternalModelsOrderStatusSwagger {
  status?: string;
}

export interface WebInternalModelsOrderSwagger {
  email?: string;
  id?: number;
  items?: WebInternalModelsItemInOrderSwagger[];
  status?: string;
  user_id?: number;
}

export interface WebInternalModelsUser {
  createdAt?: string;
  deletedAt?: GormDeletedAt;
  email?: string;
  id?: number;
  name?: string;
  password?: string;
  tags?: string;
  updatedAt?: string;
}

export interface WebInternalModelsUserCreds {
  email?: string;
  password?: string;
}

export interface WebInternalModelsUserPrototype {
  email?: string;
  name?: string;
  password?: string;
  tags?: string;
}

export interface WebInternalModelsUserSwagger {
  email?: string;
  id?: number;
  name?: string;
  order?: number;
  tags?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "//192.168.160.14:8080" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Система заявок на производстве
 * @version 1.0
 * @license Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
 * @baseUrl //192.168.160.14:8080
 * @externalDocs https://github.com/iu5git/Web/
 * @contact Корецкий К.В. <konstantin.koretskiy@gmail.com> (https://github.com/korzck)
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  items = {
    /**
     * No description
     *
     * @tags items
     * @name ItemsList
     * @summary Get list of all items
     * @request GET:/items
     */
    itemsList: (
      query?: {
        /**
         * filter by min price
         * @format text
         */
        min?: string;
        /**
         * filter by max price
         * @format text
         */
        max?: string;
        /**
         * filter by title
         * @format text
         */
        title?: string;
        /**
         * page
         * @format text
         */
        page?: string;
        /**
         * filter by material (wood/metal)
         * @format text
         */
        material?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebInternalModelsItemsSwagger, any>({
        path: `/items`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name ItemsDetail
     * @summary Get item by id
     * @request GET:/items/{id}
     */
    itemsDetail: (id?: string, params: RequestParams = {}) =>
      this.request<WebInternalModelsItemModel, any>({
        path: `/items/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name DeleteDelete
     * @summary Delete item by id
     * @request DELETE:/items/{id}/delete
     */
    deleteDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/items/${id}/delete`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name PostCreate
     * @summary Post item to current order
     * @request POST:/items/{id}/post
     */
    postCreate: (id: number, params: RequestParams = {}) =>
      this.request<WebInternalModelsOrder, any>({
        path: `/items/${id}/post`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name PutItems
     * @summary Change item
     * @request PUT:/items/{id}/put
     */
    putItems: (id: number, itemPrototype: WebInternalModelsItemPrototype, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/items/${id}/put`,
        method: "PUT",
        body: itemPrototype,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name ImageCreate
     * @summary Upload s3 file
     * @request POST:/items/image
     */
    imageCreate: (
      data: {
        /**
         * upload file
         * @format binary
         */
        file: File;
        /** metadata */
        metadata?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebInternalModelsImageSwagger, any>({
        path: `/items/image`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name PostCreate2
     * @summary Create item
     * @request POST:/items/post
     * @originalName postCreate
     * @duplicate
     */
    postCreate2: (itemPrototype: WebInternalModelsItemPrototype, params: RequestParams = {}) =>
      this.request<WebInternalModelsItemPrototype, any>({
        path: `/items/post`,
        method: "POST",
        body: itemPrototype,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags auth
     * @name LoginCreate
     * @summary Login
     * @request POST:/login
     */
    loginCreate: (userCreds: WebInternalModelsUserCreds, params: RequestParams = {}) =>
      this.request<WebInternalModelsUserSwagger, any>({
        path: `/login`,
        method: "POST",
        body: userCreds,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags auth
     * @name LogoutCreate
     * @summary Logout
     * @request POST:/logout
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags orders
     * @name OrdersList
     * @summary Get list of all orders
     * @request GET:/orders
     */
    ordersList: (
      query?: {
        /**
         * min date
         * @format text
         */
        min_date?: string;
        /**
         * max date
         * @format text
         */
        max_date?: string;
        /**
         * order status
         * @format text
         */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebInternalModelsOrder[], any>({
        path: `/orders`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersDetail
     * @summary Get order by id
     * @request GET:/orders/{id}
     */
    ordersDetail: (id: string, params: RequestParams = {}) =>
      this.request<WebInternalModelsOrderSwagger, any>({
        path: `/orders/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name ApproveUpdate
     * @summary Approve or decline order
     * @request PUT:/orders/{id}/approve
     */
    approveUpdate: (id: string, status: WebInternalModelsOrderStatusSwagger, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}/approve`,
        method: "PUT",
        body: status,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name CommentUpdate
     * @summary Delete item from current order
     * @request PUT:/orders/{id}/comment
     */
    commentUpdate: (id: string, comment: WebInternalModelsItemCommentSwagger, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}/comment`,
        method: "PUT",
        body: comment,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name DeleteDelete
     * @summary Delete current order
     * @request DELETE:/orders/delete
     */
    deleteDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/delete`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name ItemsDelete
     * @summary Delete item from current order
     * @request DELETE:/orders/items/{id}
     */
    itemsDelete: (id: string, params: RequestParams = {}) =>
      this.request<WebInternalModelsOrderSwagger, any>({
        path: `/orders/items/${id}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name MakeUpdate
     * @summary Confirm current order
     * @request PUT:/orders/make
     */
    makeUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/make`,
        method: "PUT",
        type: ContentType.Json,
        ...params,
      }),
  };
  signup = {
    /**
     * No description
     *
     * @tags auth
     * @name SignupCreate
     * @summary Sign up
     * @request POST:/signup
     */
    signupCreate: (userPrototype: WebInternalModelsUserPrototype, params: RequestParams = {}) =>
      this.request<int, any>({
        path: `/signup`,
        method: "POST",
        body: userPrototype,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  validate = {
    /**
     * No description
     *
     * @tags auth
     * @name ValidateCreate
     * @summary validate auth
     * @request POST:/validate
     */
    validateCreate: (params: RequestParams = {}) =>
      this.request<WebInternalModelsUserSwagger, any>({
        path: `/validate`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
