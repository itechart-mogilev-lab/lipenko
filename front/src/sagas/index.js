import { spawn } from "redux-saga/effects";
import {
  watchUserSignInSaga,
  watchSignOutSaga,
  watchUserSignUpSaga,
  watchUserConfirmSaga,
  watchUserNewVerificationCode
} from "./userAuth.saga";
import {
  watchExecutorSignInSaga,
  watchExecutorSignUpSaga,
  watchExecutorConfirmSaga,
  watchExecutorNewVerificationCode
} from "./executorAuth.saga";
import { watchLoadUserSaga } from "./userLoad.saga";
import { watchEditUser, watchChangePasswordUser } from "./user.saga";
import {
  watchEditMainInfoExecutor,
  watchEditTOCExecutor,
  watchChangePasswordExecutor
} from "./executor.saga";
import {
  watchLoadCompaniesSaga,
  watchChangeFiltersCompaniesSaga
} from "./companies.saga";
import { watchLoadCompanySaga } from "./company.saga";
import {
  watchChooseCompany,
  watchBookCleaning,
  watchLookOffers,
  watchResetSelectedCompany,
  watchCalculateTimePrice
} from "./order.saga";
import { watchLoadBookingsSaga, watchChangeFiltersBookingsSaga } from "./bookings.saga";

export default function*() {
  yield spawn(watchUserSignInSaga);
  yield spawn(watchUserSignUpSaga);
  yield spawn(watchUserConfirmSaga);
  yield spawn(watchUserNewVerificationCode);
  yield spawn(watchLoadUserSaga);
  yield spawn(watchEditUser);
  yield spawn(watchChangePasswordUser);

  yield spawn(watchExecutorSignInSaga);
  yield spawn(watchExecutorConfirmSaga);
  yield spawn(watchExecutorSignUpSaga);
  yield spawn(watchExecutorNewVerificationCode);
  yield spawn(watchChangePasswordExecutor);
  yield spawn(watchEditMainInfoExecutor);
  yield spawn(watchEditTOCExecutor);

  yield spawn(watchLoadBookingsSaga);
  yield spawn(watchChangeFiltersBookingsSaga);

  yield spawn(watchLoadCompaniesSaga);
  yield spawn(watchChangeFiltersCompaniesSaga);

  yield spawn(watchLoadCompanySaga);

  yield spawn(watchChooseCompany);
  yield spawn(watchResetSelectedCompany);
  yield spawn(watchBookCleaning);
  yield spawn(watchLookOffers);
  yield spawn(watchCalculateTimePrice);

  yield spawn(watchSignOutSaga);

  // yield spawn(watchLoadExecutorSaga);
}
