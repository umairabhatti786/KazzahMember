import URLS from 'api/Urls';
import {client, clientJson} from 'api/client';
import {getFormData} from './common';
import axios from 'axios';
import qs from 'qs';
import {getTimeZone} from 'react-native-localize';

const services = {
  login(data: any) {
    const body = getFormData(data);
    return client.post(URLS.LOGIN, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  register(data: any) {
    const body = getFormData(data);

    return client.post(URLS.REGISTRATION, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },

  resetPassword(data: any) {
    const body = getFormData(data);

    return client.post(URLS.RESET_PASSWORD, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },

  getChat() {
    return client.get(URLS.CHAT);
  },
  getProfile() {
    return client.get(URLS.GET_PROFILE);
  },
  resendCode() {
    return client.get(URLS.RESEND_CODE);
  },
  verifyCode(data: any) {
    const body = getFormData(data);
    return client.post(URLS.VERIFY_CODE, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  verifyResetPasswordCode(data: any) {
    const body = getFormData(data);
    return client.post(URLS.VERIFY_RESET_CODE, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  getAuthUser() {
    return client.get(URLS.GET_PROFILE);
  },
  postForgotPassword(data: any) {
    const body = getFormData(data);
    return client.post(URLS.FORGOT_PASSWORD, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  createProvider(data: any) {
    const body = getFormData(data);
    return client.post(URLS.CREATE_PROVIDER, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  userDevices(data: any) {
    const body = getFormData(data);
    return client.post(URLS.USER_DEVICES, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  createRootServices(data: any) {
    const body = getFormData(data);
    return client.post(URLS.CREATE_ROOT_SERVICES, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  getTeamMembers(id: any) {
    return client.get(`${URLS.MEMBER_TEAM}${id}`, {});
  },
  getSubChannelsById(id: any) {
    return client.get(`${URLS.GET_ROOT_MEMBER_SERVICES}/${id}`);
  },
  getChannels() {
    return client.get(URLS.ROOT_SERVICES);
  },
  getMemberTeamsList(params: string = '') {
    return client.get(`${URLS.MEMBER_TEAMS_LISTS}${params}`);
  },
  getAppointmentsList(params: string = '') {
    return client.get(`${URLS.GET_CURRENT_APPOINTMENTS}${params}`);
  },

  getContactsList(filter: string = '') {
    return client.get(`${URLS.GET_CONNECTIONS_ALL}?type=${filter}`);
  },
  checkMobileNumber(number: any) {
    return client.get(`${URLS.CHECK_PHONE_NUMBER}?mobileNo=${number}`);
  },

  getAppointmentDetail(id: string = '') {
    return client.get(`${URLS.POST_APPOINTMENT}/${id}`);
  },
  getRecentAppointments(id: any) {
    return client.get(`${URLS.RECENT_APPOINTMENT}?serviceId=${id.toString()}`);
  },
  getProviderProfileConnections(id: any) {
    return client.get(`${URLS.GET_PROVIDER_CONNECTION}/${id}`);
  },

  GetProviderProfile(id: any) {
    return client.get(`${URLS.GET_PROVIDER}/${id}`);
  },

  getMemberProfile(id: any) {
    return client.get(`${URLS.GET_PROFILE}/${id}`);
  },

  getProviderLastAppointments(id: string) {
    return client.get(`${URLS.GET_LASTAPPOINTMENT}/${id}`);
  },
  getProviderNextAppointments(id: string) {
    return client.get(`${URLS.GET_NEXT_APPOINTMENT}/${id}`);
  },
  getProviderProfile(id: any) {
    return client.get(`${URLS.GET_PROVIDER}/${id}`);
  },
  postProviderFav(data: any) {
    const body = getFormData(data);
    return client.post(URLS.CONNECTIONS_FAV, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  disconnectProvider(data: any) {
    return client.put(`${URLS.DISCONNECTION}`, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  },
  getMemberServices(id: string = '') {
    return client.get(`${URLS.GET_ROOT_MEMBER_SERVICES}/${id}`);
  },
  getSchedule(id: string) {
    return client.get(`${URLS.GET_SCHEDULE}/${id}`);
  },
  getAllProviders() {
    return client.get(URLS.GET_ALL_PROVIDERS2);
  },
  getNotifications(id: any) {
    return client.get(
      `${URLS.GET_NOTIFICATIONS}?modelId=${id}&modelType=client`,
    );
  },
  searchProviders(data: any) {
    const body = getFormData(data);
    return client.post(URLS.SEARCH_PROVIDERS, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },

  getAllPublicMedia() {
    return client.get(URLS.GET_ALL_MEDIA);
  },

  getAllProvidersMedia() {
    return client.get(`${URLS.GET_PROVIDERS_MEDIA}?providerMedia=1`);
  },
  getSearchedMedia(q: string) {
    return client.get(`${URLS.GET_PROVIDERS_MEDIA}?q=${q}`);
  },
  getAllFriendsMedia() {
    return client.get(`${URLS.GET_PROVIDERS_MEDIA}?friendsMedia=1`);
  },

  getVacations(id: string) {
    return client.get(`${URLS.GET_VACATIONS}/${id}`);
  },
  getTimeSlots(servicesId: string, date: string, providerId: string) {
    let timeZone = getTimeZone();

    const url = `${URLS.GET_TIME_SLOTS}servicesId=${servicesId}&date=${date}&providerId=${providerId}&timezone=${timeZone}`;
    return client.get(url);
  },
  getPayment(params: string = '') {
    return client.get(`${URLS.GET_PAYMENT}${params}`);
  },
  postPayment(data: any) {
    const body = getFormData(data);
    return client.post(URLS.PAY, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  createContact(data: any) {
    const body = getFormData(data);
    return client.post(URLS.CREATE_MEMBER, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  updateProfile(data: any) {
    return client.put(URLS.UPDATE_PROFILE, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // Authorization: 'Bearer ' + token,
      },
    });
  },
  createMedia(data: any) {
    const body = getFormData(data);
    return client.post(URLS.MEDIA, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  getExploreMedia() {
    return client.get(`${URLS.GET_EXPLORE_MEDIA}`);
  },
  updatePassword(data: any) {
    return client.put(URLS.UPDATE_PASSWORD, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // Authorization: 'Bearer ' + token,
      },
    });
  },
  deletePaymentCard(id: any) {
    return clientJson.delete(`${URLS.DEL_PAYMENT_CARD}${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  UplaodProfilePhoto(data: any) {
    // const body = getFormData(data);
    return client.post(URLS.PROFILE_PHOTO, data, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  createPro(data: any) {
    const body = getFormData(data);
    return client.post(URLS.CREATE_PROVIDER, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  postPaymentCash(data: any) {
    const body = getFormData(data);
    return client.post(URLS.PAYTip, body, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  getCards() {
    return client.get(`${URLS.CARDS}`);
  },

  getRootServicesChart() {
    return client.get(`${URLS.GET_CHART_DATA_ROOT_SERVICES}`);
  },
  getServicesChart() {
    return client.get(`${URLS.GET_CHART_DATA_SERVICES}`);
  },
  postAppointment(data: any) {
    return clientJson.post(URLS.POST_APPOINTMENT, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  patchAppointment(data: any) {
    return clientJson.post(URLS.POST_APPOINTMENT, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  updateMedia(data: any, id: any) {
    return client.put(`${URLS.UPDATE_MEDIA}${id}/update`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // Authorization: 'Bearer ' + token,
      },
    });
  },

  deleteMedia(id: any) {
    return client.delete(`${URLS.DEL_MEDIA}${id}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // Authorization: 'Bearer ' + token,
      },
    });
  },
  getReservationTimeConfig() {
    return client.get(
      'api/v1/configurations/get-by-key/reserved_appointment_time',
    );
  },
  appointmentStatusUpdate(id: any, status: any) {
    return clientJson.put(
      `${URLS.POST_APPOINTMENT}/${id}/status/${status}`,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  },
  getSearchSuggestions(text: string) {
    return client.get(`${URLS.SERVICES_SUGGESTIONS}${text}`);
  },
  searchedProvider(body: any) {
    const data = getFormData(body);
    return client.post(URLS.SEARCH_PROVIDERS, data, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  sendNotification(data: any) {
    const formdata = getFormData(data);

    return client.post(URLS.NOTIFICATION, formdata, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  postChat(data: any) {
    const formdata = getFormData(data);

    return client.post(URLS.CHATS, formdata, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  notificationStatus(data: any) {
    const formdata = getFormData(data);

    return client.post(URLS.NOTIFICATIONS_STATUS, formdata, {
      transformRequest: (data, headers) => {
        return data;
      },
    });
  },
  getMemberProfileById(id: any) {
    return client.get(`${URLS.GET_PROFILE}/${id}`);
  },
  getProviderProfileById(id: any) {
    return client.get(`${URLS.GET_PROVIDER}/${id}`);
  },
  postFile(body: any) {
    const data = getFormData(body);

    return client.post('api/v1/image', data, {
      transformRequest: (data, headers) => {
        return data;
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    });
  },
};

export default services;
